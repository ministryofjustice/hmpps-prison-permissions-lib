import courtScheduleReadCheck from './CourtScheduleReadCheck'
import PermissionsLogger from '../../../../../PermissionsLogger'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { PersonCourtSchedulesPermission } from '../../../../../../../types/permissions/domains/courtAndLegal/PersonCourtSchedulesPermissions'
import { Role } from '../../../../../../../types/user/Role'
import { prisonUserMock } from '../../../../../../../testUtils/UserMocks'
import { prisonerMock } from '../../../../../../../testUtils/PrisonerMocks'

const baseCheckStatusPass = PermissionCheckStatus.OK
const baseCheckStatusFail = PermissionCheckStatus.NOT_PERMITTED

describe('CourtScheduleReadCheck', () => {
  let permissionsLogger: PermissionsLogger

  beforeEach(() => {
    permissionsLogger = { logPermissionCheckStatus: jest.fn() } as unknown as PermissionsLogger
  })

  test.each`
    baseCheckStatus        | roles                            | loggedStatus                              | permitted
    ${baseCheckStatusFail} | ${[]}                            | ${baseCheckStatusFail}                    | ${false}
    ${baseCheckStatusFail} | ${[Role.ReleaseDatesCalculator]} | ${baseCheckStatusFail}                    | ${false}
    ${baseCheckStatusPass} | ${[]}                            | ${PermissionCheckStatus.ROLE_NOT_PRESENT} | ${false}
    ${baseCheckStatusPass} | ${[Role.ReleaseDatesCalculator]} | ${undefined}                              | ${true}
  `(
    'baseCheckStatus: $baseCheckStatus, roles: $roles; permitted: $permitted',
    async ({ baseCheckStatus, roles, loggedStatus, permitted }) => {
      const user = { ...prisonUserMock, userRoles: roles }
      const result = courtScheduleReadCheck({
        user,
        prisoner: prisonerMock,
        baseCheckStatus,
        requestDependentOn: [PersonCourtSchedulesPermission.read_schedule],
        permissionsLogger,
      })

      expect(result).toBe(permitted)

      if (!permitted) {
        expect(permissionsLogger.logPermissionCheckStatus).toHaveBeenCalledWith(
          user,
          prisonerMock,
          PersonCourtSchedulesPermission.read_schedule,
          loggedStatus,
        )
      } else {
        expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalled()
      }
    },
  )

  it('does not log permission failure if request not dependent on permission', () => {
    const result = courtScheduleReadCheck({
      user: prisonUserMock,
      prisoner: prisonerMock,
      baseCheckStatus: baseCheckStatusFail,
      requestDependentOn: [],
      permissionsLogger,
    })

    expect(result).toBeFalsy()
    expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalled()
  })
})
