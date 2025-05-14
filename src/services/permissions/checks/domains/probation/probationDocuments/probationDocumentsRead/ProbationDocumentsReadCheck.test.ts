import probationDocumentsReadCheck from './ProbationDocumentsReadCheck'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { prisonUserMock } from '../../../../../../../testUtils/UserMocks'
import { prisonerMock } from '../../../../../../../testUtils/PrisonerMocks'
import {
  requestDependentOnPermissionTest,
  requestNotDependentOnPermissionTest,
} from '../../../../../../../testUtils/PermissionCheckTest'
import { Role } from '../../../../../../../types/internal/user/Role'
import { ProbationDocumentsPermission } from '../../../../../../../types/public/permissions/domains/probation/probationDocuments/ProbationDocumentsPermissions'

const checkUnderTest = probationDocumentsReadCheck
const permission = ProbationDocumentsPermission.read
const baseCheckStatusPass = PermissionCheckStatus.OK
const baseCheckStatusFail = PermissionCheckStatus.NOT_PERMITTED

describe('ProbationDocumentsReadCheck', () => {
  describe(`when the request is dependent on permission: ${permission}`, () => {
    describe('when permission is granted', () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest,
        user: { ...prisonUserMock, userRoles: [Role.PomUser] },
        prisoner: prisonerMock,
        baseCheckStatus: baseCheckStatusPass,
        expectedResult: true,
      })
    })

    describe(`when the base check fails with ${baseCheckStatusFail}`, () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest,
        user: { ...prisonUserMock, userRoles: [Role.PomUser] },
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
        user: prisonUserMock,
        prisoner: prisonerMock,
        baseCheckStatus: baseCheckStatusPass,
        expectedResult: false,
        expectedStatusLogged: PermissionCheckStatus.ROLE_NOT_PRESENT,
      })
    })
  })

  describe(`when the request is NOT dependent on permission`, () => {
    requestNotDependentOnPermissionTest(checkUnderTest)
  })
})
