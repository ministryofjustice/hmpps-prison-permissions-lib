import { TelemetryClient } from 'applicationinsights'
import type Logger from 'bunyan'
import { PermissionCheckStatus } from '../../types/internal/permissions/PermissionCheckStatus'
import { HmppsUser } from '../../types/internal/user/HmppsUser'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PrisonerPermission } from '../../types/public/permissions/prisoner/PrisonerPermissions'

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

  logPermissionGrantedByDuplicate(
    user: HmppsUser,
    prisoner: Prisoner,
    duplicateRecords: Prisoner[],
    permission: PrisonerPermission,
  ) {
    if (this.telemetryClient) {
      this.telemetryClient.trackEvent({
        name: 'prisoner-permission-requirement-upgraded-by-duplicate',
        properties: {
          username: user.username,
          prisonerNumber: prisoner.prisonerNumber,
          duplicatePrisonerNumbers: duplicateRecords.map(record => record.prisonerNumber).join(','),
          activeCaseLoad: user.authSource === 'nomis' && user.activeCaseLoadId,
          permissionChecked: permission,
        },
      })
    } else {
      this.logger.info(`Required prisoner permission upgraded by duplicate: ${permission} for user ${user.username}`)
    }
  }
}
