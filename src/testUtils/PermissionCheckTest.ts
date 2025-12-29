import { PrisonerPermission } from '../types/public/permissions/prisoner/PrisonerPermissions'
import PrisonerPermissionsContext from '../types/internal/permissions/PrisonerPermissionsContext'
import { HmppsUser } from '../types/internal/user/HmppsUser'
import Prisoner from '../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PermissionCheckStatus } from '../types/internal/permissions/PermissionCheckStatus'
import PermissionsLogger from '../services/permissions/PermissionsLogger'
import { prisonUserMock } from './UserMocks'
import { prisonerMock } from './PrisonerMocks'

export function requestDependentOnPermissionTest({
  permission,
  checkUnderTest,
  user,
  prisoner,
  baseCheckStatus,
  expectedResult,
  expectedStatusLogged,
}: {
  permission: PrisonerPermission
  checkUnderTest: (permission: PrisonerPermission, context: PrisonerPermissionsContext) => boolean
  user: HmppsUser
  prisoner: Prisoner
  baseCheckStatus: PermissionCheckStatus
  expectedResult: boolean
  expectedStatusLogged?: PermissionCheckStatus
}) {
  let permissionsLogger: PermissionsLogger

  beforeEach(() => {
    permissionsLogger = { logPermissionCheckStatus: jest.fn() } as unknown as PermissionsLogger
  })

  it(`check returns expected result: ${expectedResult}${expectedResult ? '' : ` and logs status: ${expectedStatusLogged}`}`, () => {
    const result = checkUnderTest(permission, {
      user,
      prisoner,
      baseCheckStatus,
      requestDependentOn: [permission],
      permissionsLogger,
    })

    expect(result).toBe(expectedResult)

    if (!expectedResult) {
      expect(permissionsLogger.logPermissionCheckStatus).toHaveBeenCalledWith(
        user,
        prisoner,
        permission,
        expectedStatusLogged,
      )
    } else {
      expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalled()
    }
  })
}

export function requestNotDependentOnPermissionTest(
  permission: PrisonerPermission,
  checkUnderTest: (permission: PrisonerPermission, context: PrisonerPermissionsContext) => boolean,
) {
  let permissionsLogger: PermissionsLogger

  beforeEach(() => {
    permissionsLogger = { logPermissionCheckStatus: jest.fn() } as unknown as PermissionsLogger
  })

  it(`denied check does not log the permission status`, () => {
    const result = checkUnderTest(permission, {
      user: prisonUserMock,
      prisoner: prisonerMock,
      baseCheckStatus: PermissionCheckStatus.NOT_PERMITTED,
      requestDependentOn: [],
      permissionsLogger,
    })

    expect(result).toBeFalsy()
    expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalled()
  })
}
