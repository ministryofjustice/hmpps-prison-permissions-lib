import sentenceCalculationEditAdjustmentCheck from './SentenceCalculationEditAdjustmentCheck'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'
import { PersonSentenceCalculationPermission } from '../../../../../../../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { Role } from '../../../../../../../types/internal/user/Role'
import { prisonUserMock } from '../../../../../../../testUtils/UserMocks'
import { prisonerMock } from '../../../../../../../testUtils/PrisonerMocks'
import {
  requestDependentOnPermissionTest,
  requestNotDependentOnPermissionTest,
} from '../../../../../../../testUtils/PermissionCheckTest'

const permission = PersonSentenceCalculationPermission.edit_adjustments
const checkUnderTest = sentenceCalculationEditAdjustmentCheck
const baseCheckStatusPass = PermissionStatus.OK
const baseCheckStatusFail = PermissionStatus.NOT_PERMITTED

describe('SentenceCalculationEditAdjustmentCheck', () => {
  describe(`when the request is dependent on permission: ${permission}`, () => {
    describe('when permission is granted', () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest,
        user: { ...prisonUserMock, userRoles: [Role.AdjustmentsMaintainer] },
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

    describe(`when the prisoner doesn't have role ${Role.AdjustmentsMaintainer}`, () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest,
        user: prisonUserMock,
        prisoner: prisonerMock,
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
