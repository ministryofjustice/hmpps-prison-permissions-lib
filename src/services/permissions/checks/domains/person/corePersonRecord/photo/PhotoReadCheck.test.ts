import { CorePersonRecordPermission } from '../../../../../../../types/public/permissions/domains/person/corePersonRecord/CorePersonRecordPermissions'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import {
  requestDependentOnPermissionTest,
  requestNotDependentOnPermissionTest,
} from '../../../../../../../testUtils/PermissionCheckTest'
import { prisonUserMock } from '../../../../../../../testUtils/UserMocks'
import { prisonerMock } from '../../../../../../../testUtils/PrisonerMocks'
import photoReadCheck from './PhotoReadCheck'

const checkUnderTest = photoReadCheck
const permission = CorePersonRecordPermission.read_photo
const baseCheckStatusPass = PermissionCheckStatus.OK
const baseCheckStatusFail = PermissionCheckStatus.NOT_PERMITTED

describe('photoReadCheck', () => {
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

    describe(`when the user doesn't have the caseload`, () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest,
        user: prisonUserMock,
        prisoner: { ...prisonerMock, prisonId: 'SOMETHING ELSE' },
        baseCheckStatus: baseCheckStatusPass,
        expectedResult: false,
        expectedStatusLogged: PermissionCheckStatus.NOT_IN_CASELOAD,
      })
    })
  })

  describe(`when the request is NOT dependent on permission`, () => {
    requestNotDependentOnPermissionTest(checkUnderTest)
  })
})
