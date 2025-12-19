import { PrisonerPermission } from '../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckContext from '../services/permissions/checks/PermissionsCheckContext'
import { HmppsUser } from '../types/internal/user/HmppsUser'
import Prisoner from '../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PermissionStatus } from '../types/internal/permissions/PermissionStatus'
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
  checkUnderTest: (request: PermissionsCheckContext) => boolean
  user: HmppsUser
  prisoner: Prisoner
  baseCheckStatus: PermissionStatus
  expectedResult: boolean
  expectedStatusLogged?: PermissionStatus
}) {
  let permissionsLogger: PermissionsLogger

  beforeEach(() => {
    permissionsLogger = { logpermissionStatus: jest.fn() } as unknown as PermissionsLogger
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
      expect(permissionsLogger.logpermissionStatus).toHaveBeenCalledWith(
        user,
        prisoner,
        permission,
        expectedStatusLogged,
      )
    } else {
      expect(permissionsLogger.logpermissionStatus).not.toHaveBeenCalled()
    }
  })
}

export function requestNotDependentOnPermissionTest(checkUnderTest: (request: PermissionsCheckContext) => boolean) {
  let permissionsLogger: PermissionsLogger

  beforeEach(() => {
    permissionsLogger = { logpermissionStatus: jest.fn() } as unknown as PermissionsLogger
  })

  it(`denied check does not log the permission status`, () => {
    const result = checkUnderTest({
      user: prisonUserMock,
      prisoner: prisonerMock,
      baseCheckStatus: PermissionStatus.NOT_PERMITTED,
      requestDependentOn: [],
      permissionsLogger,
    })

    expect(result).toBeFalsy()
    expect(permissionsLogger.logpermissionStatus).not.toHaveBeenCalled()
  })
}
