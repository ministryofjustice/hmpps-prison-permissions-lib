import { PermissionStatus } from '../../../../types/internal/permissions/PermissionStatus'
import PermissionsLogger from '../../PermissionsLogger'
import { prisonUserMock } from '../../../../testUtils/UserMocks'
import baseCheck from './BaseCheck'
import { prisonerMock } from '../../../../testUtils/PrisonerMocks'
import { PrisonerBasePermission } from '../../../../types/public/permissions/prisoner/PrisonerPermissions'

const baseCheckStatusGranted = PermissionStatus.OK
const baseCheckStatusDenied = PermissionStatus.NOT_PERMITTED

describe('BaseCheck', () => {
  let permissionsLogger: PermissionsLogger

  beforeEach(() => {
    permissionsLogger = { logpermissionStatus: jest.fn() } as unknown as PermissionsLogger
  })

  test.each`
    baseCheckStatus           | permitted
    ${baseCheckStatusDenied}  | ${false}
    ${baseCheckStatusGranted} | ${true}
  `('baseCheckStatus: $baseCheckStatus, permitted: $permitted', async ({ baseCheckStatus, permitted }) => {
    const user = prisonUserMock
    const result = baseCheck(PrisonerBasePermission.read, {
      user,
      prisoner: prisonerMock,
      baseCheckStatus,
      requestDependentOn: [PrisonerBasePermission.read],
      permissionsLogger,
    })

    expect(result).toBe(permitted)

    if (!permitted) {
      expect(permissionsLogger.logpermissionStatus).toHaveBeenCalledWith(
        user,
        prisonerMock,
        PrisonerBasePermission.read,
        baseCheckStatus,
      )
    } else {
      expect(permissionsLogger.logpermissionStatus).not.toHaveBeenCalled()
    }
  })

  it('does not log permission failure if request not dependent on permission', () => {
    const result = baseCheck(PrisonerBasePermission.read, {
      user: prisonUserMock,
      prisoner: prisonerMock,
      baseCheckStatus: baseCheckStatusDenied,
      requestDependentOn: [],
      permissionsLogger,
    })

    expect(result).toBeFalsy()
    expect(permissionsLogger.logpermissionStatus).not.toHaveBeenCalled()
  })
})
