import { PermissionCheckStatus } from '../../../../types/permissions/PermissionCheckStatus'
import PermissionsLogger from '../../PermissionsLogger'
import { prisonUserMock } from '../../../../testUtils/UserMocks'
import baseCheck from './BaseCheck'
import { prisonerMock } from '../../../../testUtils/PrisonerMocks'
import { PrisonerBasePermission } from '../../../../types/permissions/prisoner/PrisonerPermissions'

const baseCheckStatusGranted = PermissionCheckStatus.OK
const baseCheckStatusDenied = PermissionCheckStatus.NOT_PERMITTED

describe('BaseCheck', () => {
  let permissionsLogger: PermissionsLogger

  beforeEach(() => {
    permissionsLogger = { logPermissionCheckStatus: jest.fn() } as unknown as PermissionsLogger
  })

  test.each`
    baseCheckStatus           | permitted
    ${baseCheckStatusDenied}  | ${false}
    ${baseCheckStatusGranted} | ${true}
  `('baseCheckStatus: $baseCheckStatus, permitted: $permitted', async ({ baseCheckStatus, permitted }) => {
    const user = prisonUserMock
    const result = baseCheck({
      user,
      prisoner: prisonerMock,
      baseCheckStatus,
      requestDependentOn: [PrisonerBasePermission.read],
      permissionsLogger,
    })

    expect(result).toBe(permitted)

    if (!permitted) {
      expect(permissionsLogger.logPermissionCheckStatus).toHaveBeenCalledWith(
        user,
        prisonerMock,
        PrisonerBasePermission.read,
        baseCheckStatus,
      )
    } else {
      expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalled()
    }
  })

  it('does not log permission failure if request not dependent on permission', () => {
    const result = baseCheck({
      user: prisonUserMock,
      prisoner: prisonerMock,
      baseCheckStatus: baseCheckStatusDenied,
      requestDependentOn: [],
      permissionsLogger,
    })

    expect(result).toBeFalsy()
    expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalled()
  })
})
