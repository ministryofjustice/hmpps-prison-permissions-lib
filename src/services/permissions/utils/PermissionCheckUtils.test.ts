import {
  requestDependentOnPermissionTest,
  requestNotDependentOnPermissionTest,
} from '../../../testUtils/PermissionCheckTest'
import { matchBaseCheckAnd } from './PermissionCheckUtils'
import { prisonUserMock } from '../../../testUtils/UserMocks'
import { prisonerMock } from '../../../testUtils/PrisonerMocks'
import { PermissionStatus } from '../../../types/internal/permissions/PermissionStatus'
import { CorePersonRecordPermission } from '../../../types/public/permissions/domains/person/corePersonRecord/CorePersonRecordPermissions'
import photoReadCheck from '../checks/domains/person/corePersonRecord/photo/PhotoReadCheck'

const checkUnderTest = photoReadCheck
const permission = CorePersonRecordPermission.read_photo
const baseCheckStatusPass = PermissionStatus.OK
const baseCheckStatusFail = PermissionStatus.NOT_PERMITTED

describe('followBaseCheckExcept', () => {
  describe(`when the request is dependent on permission: ${permission}`, () => {
    describe('when permission is granted', () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest: req => matchBaseCheckAnd(req, permission, {}),
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

    describe(`when the user doesn't have the caseload`, () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest,
        user: prisonUserMock,
        prisoner: { ...prisonerMock, prisonId: 'SOMETHING ELSE' },
        baseCheckStatus: baseCheckStatusPass,
        expectedResult: false,
        expectedStatusLogged: PermissionStatus.NOT_IN_CASELOAD,
      })
    })
  })

  describe(`when the request is NOT dependent on permission`, () => {
    requestNotDependentOnPermissionTest(checkUnderTest)
  })
})
