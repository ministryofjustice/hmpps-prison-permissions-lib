import { TelemetryClient } from 'applicationinsights'
import type Logger from 'bunyan'
import { PermissionStatus } from '../../types/internal/permissions/PermissionStatus'
import { HmppsUser } from '../../types/internal/user/HmppsUser'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PrisonerPermission } from '../../types/public/permissions/prisoner/PrisonerPermissions'

export default class PermissionsLogger {
  constructor(
    private readonly logger: Logger | Console,
    private readonly telemetryClient?: TelemetryClient,
  ) {}

  logpermissionStatus(
    user: HmppsUser,
    prisoner: Prisoner,
    permission: PrisonerPermission,
    permissionStatus: PermissionStatus,
  ) {
    if (permissionStatus === PermissionStatus.OK) return

    if (this.telemetryClient) {
      this.telemetryClient.trackEvent({
        name: 'prisoner-permission-denied',
        properties: {
          username: user.username,
          prisonerNumber: prisoner.prisonerNumber,
          activeCaseLoad: user.authSource === 'nomis' && user.activeCaseLoadId,
          permissionChecked: permission,
          status: permissionStatus,
        },
      })
    } else {
      this.logger.info(`Prisoner permission denied: ${permission} (${permissionStatus}) for user ${user.username}`)
    }
  }
}
