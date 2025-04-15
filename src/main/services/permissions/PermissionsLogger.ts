import { TelemetryClient } from 'applicationinsights'
import type Logger from 'bunyan'
import { PrisonerPermission, PrisonerPermissionOperation } from '../../types/permissions/prisoner/PrisonerPermissions'
import { PermissionCheckStatus } from '../../types/permissions/PermissionCheckStatus'
import { HmppsUser } from '../../types/user/HmppsUser'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'

export default class PermissionsLogger {
  constructor(
    private readonly logger: Logger | Console,
    private readonly telemetryClient?: TelemetryClient,
  ) {}

  logPermissionCheckStatus(
    user: HmppsUser,
    prisoner: Prisoner,
    permission: PrisonerPermissionOperation,
    permissionCheckStatus: PermissionCheckStatus,
  ) {
    if (permissionCheckStatus === PermissionCheckStatus.OK) return

    if (this.telemetryClient) {
      this.telemetryClient.trackEvent({
        name: 'prisoner-permission-check-failed',
        properties: {
          username: user.username,
          prisonerNumber: prisoner.prisonerNumber,
          activeCaseLoad: user.authSource === 'nomis' && user.activeCaseLoadId,
          permissionChecked: permission,
          status: permissionCheckStatus,
        },
      })
    } else {
      this.logger.info(`Prisoner permission check failed: ${permission} : ${permissionCheckStatus}`)
    }
  }
}
