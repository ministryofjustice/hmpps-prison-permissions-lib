import type bunyan from 'bunyan'
import { ApiConfig, AuthenticationClient } from '@ministryofjustice/hmpps-rest-client'
import { TelemetryClient } from 'applicationinsights'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import PrisonApiClient from '../../data/prisonApi/PrisonApiClient'
import { HmppsUser } from '../../types/user/HmppsUser'
import PermissionsLogger from './PermissionsLogger'
import {
  PrisonerBasePermission,
  PrisonerPermission,
  PrisonerPermissions,
} from '../../types/permissions/prisoner/PrisonerPermissions'
import baseCheck from './checks/baseCheck/BaseCheck'
import { PermissionCheckStatus } from '../../types/permissions/PermissionCheckStatus'
import PrisonerSearchClient from '../../data/hmppsPrisonerSearch/PrisonerSearchClient'

export default class PermissionsService {
  private readonly prisonApiClient: PrisonApiClient

  private readonly prisonerSearchClient: PrisonerSearchClient

  readonly permissionsLogger: PermissionsLogger

  static create({
    prisonApiConfig,
    prisonerSearchConfig,
    authenticationClient,
    logger = console,
    telemetryClient,
  }: {
    prisonApiConfig: ApiConfig
    prisonerSearchConfig: ApiConfig
    authenticationClient: AuthenticationClient
    logger?: bunyan | typeof console
    telemetryClient?: TelemetryClient
  }): PermissionsService {
    return new PermissionsService(
      new PrisonApiClient(logger, prisonApiConfig),
      new PrisonerSearchClient(logger, prisonerSearchConfig, authenticationClient),
      new PermissionsLogger(logger, telemetryClient),
    )
  }

  private constructor(
    prisonApiClient: PrisonApiClient,
    prisonerSearchClient: PrisonerSearchClient,
    permissionsLogger: PermissionsLogger,
  ) {
    this.prisonApiClient = prisonApiClient
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
    const baseCheckStatus = baseCheck(user, prisoner)
    const basePermission = PrisonerBasePermission.read

    if (baseCheckStatus !== PermissionCheckStatus.OK && requestDependentOn.includes(basePermission)) {
      this.permissionsLogger.logPermissionCheckStatus(user, prisoner, basePermission, baseCheckStatus)
    }

    return {
      [PrisonerBasePermission.read]: baseCheckStatus === PermissionCheckStatus.OK,

      // TODO:
      // domainGroups: {
      //    ...
      // },
    } as PrisonerPermissions
  }

  public async isUserAKeyWorkerAtPrison(token: string, user: HmppsUser, prison: string): Promise<boolean> {
    if (user.authSource !== 'nomis') {
      return Promise.resolve(false)
    }
    return this.prisonApiClient.isUserAKeyWorker(token, user.staffId, prison)
  }

  public getPrisonerDetails(prisonerNumber: string): Promise<Prisoner> {
    return this.prisonerSearchClient.getPrisonerDetails(prisonerNumber)
  }
}
