import prisonerAdjudicationsReadCheck from './PrisonerAdjudicationsReadCheck'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { prisonUserMock } from '../../../../../../../testUtils/UserMocks'
import { prisonerMock } from '../../../../../../../testUtils/PrisonerMocks'
import { PrisonerAdjudicationsPermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsPermissions'
import {
  requestDependentOnPermissionTest,
  requestNotDependentOnPermissionTest,
} from '../../../../../../../testUtils/PermissionCheckTest'

const checkUnderTest = prisonerAdjudicationsReadCheck
const permission = PrisonerAdjudicationsPermission.read
const baseCheckStatusPass = PermissionCheckStatus.OK
const baseCheckStatusFail = PermissionCheckStatus.NOT_PERMITTED

describe('PrisonerAdjudicationsReadCheck', () => {
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

    describe('when the prisoner is outside of the user caseload', () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest,
        user: prisonUserMock,
        prisoner: { ...prisonerMock, prisonId: 'SOMEWHERE_ELSE' },
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
