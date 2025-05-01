import { TelemetryClient } from 'applicationinsights'
import type Logger from 'bunyan'
import { PermissionCheckStatus } from '../../types/permissions/PermissionCheckStatus'
import { HmppsUser } from '../../types/user/HmppsUser'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PrisonerPermission } from '../../types/permissions/prisoner/PrisonerPermissions'

export default class PermissionsLogger {
  constructor(
    private readonly logger: Logger | Console,
    private readonly telemetryClient?: TelemetryClient,
  ) {}

  logPermissionCheckStatus(
    user: HmppsUser,
    prisoner: Prisoner,
    permission: PrisonerPermission,
    permissionCheckStatus: PermissionCheckStatus,
  ) {
    if (permissionCheckStatus === PermissionCheckStatus.OK) return

    if (this.telemetryClient) {
      this.telemetryClient.trackEvent({
        name: 'prisoner-permission-denied',
        properties: {
          username: user.username,
          prisonerNumber: prisoner.prisonerNumber,
          activeCaseLoad: user.authSource === 'nomis' && user.activeCaseLoadId,
          permissionChecked: permission,
          status: permissionCheckStatus,
        },
      })
    } else {
      this.logger.info(`Prisoner permission denied: ${permission} (${permissionCheckStatus}) for user ${user.username}`)
    }
  }
}
