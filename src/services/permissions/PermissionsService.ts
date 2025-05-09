import type bunyan from 'bunyan'
import { ApiConfig, AuthenticationClient } from '@ministryofjustice/hmpps-rest-client'
import { TelemetryClient } from 'applicationinsights'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { HmppsUser } from '../../types/user/HmppsUser'
import PermissionsLogger from './PermissionsLogger'
import {
  PrisonerBasePermission,
  PrisonerPermission,
  PrisonerPermissions,
} from '../../types/permissions/prisoner/PrisonerPermissions'
import PrisonerSearchClient from '../../data/hmppsPrisonerSearch/PrisonerSearchClient'
import sentenceAndOffenceCheck from './checks/domains/sentenceAndOffence/SentenceAndOffenceCheck'
import baseCheck from './checks/baseCheck/BaseCheck'
import PermissionsCheckRequest from './checks/PermissionsCheckRequest'
import baseCheckStatus from './checks/baseCheck/status/BaseCheckStatus'
import prisonerSpecificCheck from './checks/domains/prisonerSpecific/PrisonerSpecificCheck'
import runningAPrisonCheck from './checks/domains/runningAPrison/RunningAPrisonCheck'
import personCheck from './checks/domains/person/PersonCheck'

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
      [PrisonerBasePermission.read]: baseCheck(request),

      domainGroups: {
        sentenceAndOffence: sentenceAndOffenceCheck(request),
        prisonerSpecific: prisonerSpecificCheck(request),
        runningAPrison: runningAPrisonCheck(request),
        person: personCheck(request),
      },
    }
  }

  public getPrisonerDetails(prisonerNumber: string): Promise<Prisoner> {
    return this.prisonerSearchClient.getPrisonerDetails(prisonerNumber)
  }
}
