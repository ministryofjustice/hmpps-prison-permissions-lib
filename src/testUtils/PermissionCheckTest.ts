import { PrisonerPermission } from '../types/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../services/permissions/checks/PermissionsCheckRequest'
import { HmppsUser } from '../types/user/HmppsUser'
import Prisoner from '../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PermissionCheckStatus } from '../types/permissions/PermissionCheckStatus'
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
  checkUnderTest: (request: PermissionsCheckRequest) => boolean
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
    const result = checkUnderTest({
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

export function requestNotDependentOnPermissionTest(checkUnderTest: (request: PermissionsCheckRequest) => boolean) {
  let permissionsLogger: PermissionsLogger

  beforeEach(() => {
    permissionsLogger = { logPermissionCheckStatus: jest.fn() } as unknown as PermissionsLogger
  })

  it(`denied check does not log the permission status`, () => {
    const result = checkUnderTest({
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
