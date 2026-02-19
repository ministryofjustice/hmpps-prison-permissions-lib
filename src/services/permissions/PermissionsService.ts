import type bunyan from 'bunyan'
import { ApiConfig, AuthenticationClient } from '@ministryofjustice/hmpps-rest-client'
import { TelemetryClient } from 'applicationinsights'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { HmppsUser } from '../../types/internal/user/HmppsUser'
import PermissionsLogger from './PermissionsLogger'
import PrisonerSearchClient from '../../data/hmppsPrisonerSearch/PrisonerSearchClient'
import sentenceAndOffenceCheck from './checks/domains/sentenceAndOffence/SentenceAndOffenceCheck'
import baseCheck from './checks/baseCheck/BaseCheck'
import PrisonerPermissionsContext from '../../types/internal/permissions/PrisonerPermissionsContext'
import prisonerSpecificCheck from './checks/domains/prisonerSpecific/PrisonerSpecificCheck'
import runningAPrisonCheck from './checks/domains/runningAPrison/RunningAPrisonCheck'
import personCheck from './checks/domains/person/PersonCheck'
import securityCheck from './checks/domains/security/SecurityCheck'
import probationCheck from './checks/domains/probation/ProbationCheck'
import interventionsCheck from './checks/domains/interventions/InterventionsCheck'
import {
  PrisonerBasePermission,
  PrisonerPermission,
  PrisonerPermissions,
} from '../../types/public/permissions/prisoner/PrisonerPermissions'
import personPlanAndNeedsCheck from './checks/domains/personPlanAndNeeds/PersonPlanAndNeedsCheck'
import { baseCheckStatus } from './checks/baseCheck/status/BaseCheckStatus'
import { upgradePermissions } from './utils/PermissionUtils'
import { Role } from '../../types/internal/user/Role'
import { isGranted } from '../../types/public/permissions/prisoner/PrisonerPermissionsUtils'

export default class PermissionsService {
  private readonly prisonerSearchClient: PrisonerSearchClient

  readonly permissionsLogger: PermissionsLogger

  private readonly readOnly: boolean

  static create({
    prisonerSearchConfig,
    authenticationClient,
    logger = console,
    telemetryClient,
    readOnly = false,
  }: {
    prisonerSearchConfig: ApiConfig
    authenticationClient: AuthenticationClient
    logger?: bunyan | typeof console
    telemetryClient?: TelemetryClient
    readOnly?: boolean
  }): PermissionsService {
    return new PermissionsService(
      new PrisonerSearchClient(logger, prisonerSearchConfig, authenticationClient),
      new PermissionsLogger(logger, telemetryClient),
      readOnly,
    )
  }

  private constructor(
    prisonerSearchClient: PrisonerSearchClient,
    permissionsLogger: PermissionsLogger,
    readOnly: boolean,
  ) {
    this.prisonerSearchClient = prisonerSearchClient
    this.permissionsLogger = permissionsLogger
    this.readOnly = readOnly
  }

  public getPrisonerPermissions({
    user,
    prisoner,
    requestDependentOn,
    duplicateRecords = [],
  }: {
    user: HmppsUser
    prisoner: Prisoner
    requestDependentOn: PrisonerPermission[]
    duplicateRecords?: Prisoner[]
  }): PrisonerPermissions {
    const prisonerPermissions = this.calculatePrisonerPermissions({
      user,
      prisoner,
      requestDependentOn,
    })

    if (requestDependentOn.length > 0) {
      return this.upgradePermissionsFromDuplicateRecords(
        prisoner,
        prisonerPermissions,
        duplicateRecords,
        user,
        requestDependentOn,
      )
    }

    return prisonerPermissions
  }

  private calculatePrisonerPermissions({
    user,
    prisoner,
    requestDependentOn,
    readOnly = false,
  }: {
    user: HmppsUser
    prisoner: Prisoner
    requestDependentOn: PrisonerPermission[]
    readOnly?: boolean
  }): PrisonerPermissions {
    const context: PrisonerPermissionsContext = {
      user,
      prisoner,
      baseCheckStatus: baseCheckStatus(user, prisoner),
      requestDependentOn,
      permissionsLogger: this.permissionsLogger,
      readOnly: readOnly || this.readOnly,
    }

    return {
      [PrisonerBasePermission.read]: baseCheck(PrisonerBasePermission.read, context),

      domainGroups: {
        interventions: interventionsCheck(context),
        person: personCheck(context),
        personPlanAndNeeds: personPlanAndNeedsCheck(context),
        prisonerSpecific: prisonerSpecificCheck(context),
        probation: probationCheck(context),
        runningAPrison: runningAPrisonCheck(context),
        security: securityCheck(context),
        sentenceAndOffence: sentenceAndOffenceCheck(context),
      },
    }
  }

  /*
   * Policy dictates that users should be permitted the highest level of READ access they have across
   * duplicate records so that they can assess whether any data from the duplicate record is relevant to their work.
   */
  private upgradePermissionsFromDuplicateRecords(
    prisoner: Prisoner,
    basePermissions: PrisonerPermissions,
    duplicateRecords: Prisoner[],
    user: HmppsUser,
    requestDependentOn: PrisonerPermission[],
  ): PrisonerPermissions {
    /*
     * To prevent users with the INACTIVE_BOOKINGS (Released Prisoner Viewing) role being able to gain read access
     * to active prisoner records outside their caseload, by virtue of having access to their inactive duplicate
     * record, we will discount this role when calculating permissions for duplicate records.
     */
    const rolesToDiscountForDuplicateRecords = [Role.InactiveBookings]
    const userWithoutDiscountedRoles = {
      ...user,
      userRoles: user.userRoles.filter(role => !rolesToDiscountForDuplicateRecords.includes(role)),
    }

    const upgradedPermissions = duplicateRecords.reduce((acc, duplicatePrisoner) => {
      const duplicatePrisonerPermissions = this.calculatePrisonerPermissions({
        user: userWithoutDiscountedRoles,
        prisoner: duplicatePrisoner,
        requestDependentOn: [], // Don't log when checking permissions for duplicate records
        readOnly: true, // Only provide additional read-only permission from the duplicate record
      })

      return upgradePermissions(acc, duplicatePrisonerPermissions)
    }, basePermissions)

    requestDependentOn.forEach(requiredPermission => {
      if (!isGranted(requiredPermission, basePermissions) && isGranted(requiredPermission, upgradedPermissions)) {
        this.permissionsLogger.logPermissionGrantedByDuplicate(user, prisoner, duplicateRecords, requiredPermission)
      }
    })

    return upgradedPermissions
  }

  public getPrisonerDetails(prisonerNumber: string): Promise<Prisoner> {
    return this.prisonerSearchClient.getPrisonerDetails(prisonerNumber)
  }
}
