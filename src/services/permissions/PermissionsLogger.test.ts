import Logger from 'bunyan'
import { TelemetryClient } from 'applicationinsights'
import PermissionsLogger from './PermissionsLogger'
import { PrisonUser } from '../../types/user/HmppsUser'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PrisonerBasePermission } from '../../types/permissions/prisoner/PrisonerPermissions'
import { PermissionCheckStatus } from '../../types/permissions/PermissionCheckStatus'

jest.mock('./checks/baseCheck/status/BaseCheckStatus', () => jest.fn())

const user = { authSource: 'nomis', staffId: 123, activeCaseLoadId: 'MDI' } as PrisonUser
const prisoner = { prisonerNumber: 'A1234BC' } as Prisoner
const permission = PrisonerBasePermission.read
const permissionCheckStatus = PermissionCheckStatus.NOT_PERMITTED

describe('PermissionsLogger', () => {
  let logger: Logger
  let telemetryClient: TelemetryClient

  let permissionsLogger: PermissionsLogger

  beforeEach(() => {
    logger = { info: jest.fn() } as unknown as Logger
    telemetryClient = { trackEvent: jest.fn() } as unknown as TelemetryClient
  })

  describe('logPermissionCheckStatus', () => {
    it('logs using the logger if no telemetryClient provided', () => {
      permissionsLogger = new PermissionsLogger(logger)

      permissionsLogger.logPermissionCheckStatus(user, prisoner, permission, permissionCheckStatus)

      expect(logger.info).toHaveBeenCalledWith(
        `Prisoner permission denied: ${permission} (${permissionCheckStatus}) for user ${user.username}`,
      )
    })

    it('tracks event using the telemetry client when provided', () => {
      permissionsLogger = new PermissionsLogger(logger, telemetryClient)

      permissionsLogger.logPermissionCheckStatus(user, prisoner, permission, permissionCheckStatus)

      expect(telemetryClient.trackEvent).toHaveBeenCalledWith({
        name: 'prisoner-permission-denied',
        properties: {
          username: user.username,
          prisonerNumber: prisoner.prisonerNumber,
          activeCaseLoad: user.activeCaseLoadId,
          permissionChecked: permission,
          status: permissionCheckStatus,
        },
      })

      expect(logger.info).not.toHaveBeenCalled()
    })
  })
})
