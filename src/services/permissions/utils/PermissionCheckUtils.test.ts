import { prisonUserMock } from '../../../testUtils/UserMocks'
import { prisonerMock } from '../../../testUtils/PrisonerMocks'
import { PermissionCheckStatus } from '../../../types/internal/permissions/PermissionCheckStatus'
import PermissionsLogger from '../PermissionsLogger'
import { matchBaseCheckAnd } from './PermissionCheckUtils'
import { PrisonerBasePermission } from '../../../types/public/permissions/prisoner/PrisonerPermissions'

const permission = PrisonerBasePermission.read

describe('matchBaseCheckAnd', () => {
  let permissionsLogger: PermissionsLogger

  beforeEach(() => {
    permissionsLogger = { logPermissionCheckStatus: jest.fn() } as unknown as PermissionsLogger
  })

  it('returns true when base check and additional checks have passed', () => {
    const result = matchBaseCheckAnd({ overridingCondition: () => PermissionCheckStatus.OK })(permission, {
      user: prisonUserMock,
      prisoner: prisonerMock,
      baseCheckStatus: PermissionCheckStatus.OK,
      requestDependentOn: [permission],
      permissionsLogger,
      readOnly: false,
    })

    expect(result).toBe(true)
    expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalled()
  })

  it('returns false when base check fails', () => {
    const result = matchBaseCheckAnd({ overridingCondition: () => PermissionCheckStatus.OK })(permission, {
      user: prisonUserMock,
      prisoner: prisonerMock,
      baseCheckStatus: PermissionCheckStatus.NOT_PERMITTED,
      requestDependentOn: [permission],
      permissionsLogger,
      readOnly: false,
    })

    expect(result).toBe(false)

    expect(permissionsLogger.logPermissionCheckStatus).toHaveBeenCalledWith(
      prisonUserMock,
      prisonerMock,
      permission,
      PermissionCheckStatus.NOT_PERMITTED,
    )
  })

  it('returns false when additional check fails', () => {
    const result = matchBaseCheckAnd({ overridingCondition: () => PermissionCheckStatus.NOT_PERMITTED })(permission, {
      user: prisonUserMock,
      prisoner: prisonerMock,
      baseCheckStatus: PermissionCheckStatus.OK,
      requestDependentOn: [permission],
      permissionsLogger,
      readOnly: false,
    })

    expect(result).toBe(false)

    expect(permissionsLogger.logPermissionCheckStatus).toHaveBeenCalledWith(
      prisonUserMock,
      prisonerMock,
      permission,
      PermissionCheckStatus.NOT_PERMITTED,
    )
  })

  it('returns false when both base check and additional check fails', () => {
    const result = matchBaseCheckAnd({ overridingCondition: () => PermissionCheckStatus.ROLE_NOT_PRESENT })(
      permission,
      {
        user: prisonUserMock,
        prisoner: prisonerMock,
        baseCheckStatus: PermissionCheckStatus.NOT_PERMITTED,
        requestDependentOn: [permission],
        permissionsLogger,
        readOnly: false,
      },
    )

    expect(result).toBe(false)

    expect(permissionsLogger.logPermissionCheckStatus).toHaveBeenCalledWith(
      prisonUserMock,
      prisonerMock,
      permission,
      PermissionCheckStatus.NOT_PERMITTED,
    )
  })

  it('check failure not logged if request not dependent on permission', () => {
    const result = matchBaseCheckAnd({ overridingCondition: () => PermissionCheckStatus.ROLE_NOT_PRESENT })(
      permission,
      {
        user: prisonUserMock,
        prisoner: prisonerMock,
        baseCheckStatus: PermissionCheckStatus.NOT_PERMITTED,
        requestDependentOn: [],
        permissionsLogger,
        readOnly: false,
      },
    )

    expect(result).toBe(false)
    expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalled()
  })
})
