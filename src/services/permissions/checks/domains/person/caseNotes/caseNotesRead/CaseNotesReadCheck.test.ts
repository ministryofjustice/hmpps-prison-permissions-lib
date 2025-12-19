import caseNotesReadCheck from './CaseNotesReadCheck'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'
import { prisonUserMock } from '../../../../../../../testUtils/UserMocks'
import { prisonerMock } from '../../../../../../../testUtils/PrisonerMocks'
import {
  requestDependentOnPermissionTest,
  requestNotDependentOnPermissionTest,
} from '../../../../../../../testUtils/PermissionCheckTest'
import { Role } from '../../../../../../../types/internal/user/Role'
import { CaseNotesPermission } from '../../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'

const checkUnderTest = caseNotesReadCheck
const permission = CaseNotesPermission.read
const baseCheckStatusPass = PermissionStatus.OK
const baseCheckStatusFail = PermissionStatus.NOT_PERMITTED

describe('caseNotesReadCheck', () => {
  describe(`when the request is dependent on permission: ${permission}`, () => {
    describe('when permission is granted', () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest,
        user: prisonUserMock,
        prisoner: prisonerMock,
        baseCheckStatus: baseCheckStatusPass,
        expectedResult: true,
      })
    })

    describe(`when the base check fails with ${baseCheckStatusFail}`, () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest,
        user: prisonUserMock,
        prisoner: prisonerMock,
        baseCheckStatus: baseCheckStatusFail,
        expectedResult: false,
        expectedStatusLogged: baseCheckStatusFail,
      })
    })

    describe(`when the user doesn't have a required role`, () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest,
        user: { ...prisonUserMock, userRoles: [Role.GlobalSearch] },
        prisoner: { ...prisonerMock, prisonId: 'SOMETHING ELSE' },
        baseCheckStatus: baseCheckStatusPass,
        expectedResult: false,
        expectedStatusLogged: PermissionStatus.ROLE_NOT_PRESENT,
      })
    })
  })

  describe(`when the request is NOT dependent on permission`, () => {
    requestNotDependentOnPermissionTest(checkUnderTest)
  })
})
