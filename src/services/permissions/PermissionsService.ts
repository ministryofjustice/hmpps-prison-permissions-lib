import type bunyan from 'bunyan'
import { ApiConfig, AuthenticationClient } from '@ministryofjustice/hmpps-rest-client'
import { TelemetryClient } from 'applicationinsights'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { HmppsUser } from '../../types/internal/user/HmppsUser'
import PermissionsLogger from './PermissionsLogger'
import PrisonerSearchClient from '../../data/hmppsPrisonerSearch/PrisonerSearchClient'
import sentenceAndOffenceCheck from './checks/domains/sentenceAndOffence/SentenceAndOffenceCheck'
import baseCheck from './checks/baseCheck/BaseCheck'
import PermissionsCheckRequest from './checks/PermissionsCheckRequest'
import baseCheckStatus from './checks/baseCheck/status/BaseCheckStatus'
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

export default class PermissionsService {
  private readonly prisonerSearchClient: PrisonerSearchClient

  readonly permissionsLogger: PermissionsLogger

  static create({
    prisonerSearchConfig,
    authenticationClient,
    logger = console,
    telemetryClient,
  }: {
    prisonerSearchConfig: ApiConfig
    authenticationClient: AuthenticationClient
    logger?: bunyan | typeof console
    telemetryClient?: TelemetryClient
  }): PermissionsService {
    return new PermissionsService(
      new PrisonerSearchClient(logger, prisonerSearchConfig, authenticationClient),
      new PermissionsLogger(logger, telemetryClient),
    )
  }

  private constructor(prisonerSearchClient: PrisonerSearchClient, permissionsLogger: PermissionsLogger) {
    this.prisonerSearchClient = prisonerSearchClient
    this.permissionsLogger = permissionsLogger
  }

  public getPrisonerPermissions({
    user,
    prisoner,
    requestDependentOn,
  }: {
    user: HmppsUser
    prisoner: Prisoner
    requestDependentOn: PrisonerPermission[]
  }): PrisonerPermissions {
    const request: PermissionsCheckRequest = {
      user,
      prisoner,
      baseCheckStatus: baseCheckStatus(user, prisoner),
      requestDependentOn,
      permissionsLogger: this.permissionsLogger,
    }

    return {
      [PrisonerBasePermission.read]: baseCheck(PrisonerBasePermission.read, request),

      domainGroups: {
        interventions: interventionsCheck(request),
        person: personCheck(request),
        personPlanAndNeeds: personPlanAndNeedsCheck(request),
        prisonerSpecific: prisonerSpecificCheck(request),
        probation: probationCheck(request),
        runningAPrison: runningAPrisonCheck(request),
        security: securityCheck(request),
        sentenceAndOffence: sentenceAndOffenceCheck(request),
      },
    }
  }

  public getPrisonerDetails(prisonerNumber: string): Promise<Prisoner> {
    return this.prisonerSearchClient.getPrisonerDetails(prisonerNumber)
  }
}
