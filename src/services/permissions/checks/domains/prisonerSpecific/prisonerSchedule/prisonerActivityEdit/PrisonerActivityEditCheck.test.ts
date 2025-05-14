import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import {
  requestDependentOnPermissionTest,
  requestNotDependentOnPermissionTest,
} from '../../../../../../../testUtils/PermissionCheckTest'
import { prisonUserMock } from '../../../../../../../testUtils/UserMocks'
import { prisonerMock } from '../../../../../../../testUtils/PrisonerMocks'
import prisonerActivityEditCheck from './PrisonerActivityEditCheck'
import { PrisonerSchedulePermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerSchedule/PrisonerSchedulePermissions'
import CaseLoad from '../../../../../../../types/internal/user/CaseLoad'
import { Role } from '../../../../../../../types/internal/user/Role'

const checkUnderTest = prisonerActivityEditCheck
const permission = PrisonerSchedulePermission.edit_activity
const baseCheckStatusPass = PermissionCheckStatus.OK
const baseCheckStatusFail = PermissionCheckStatus.NOT_PERMITTED

describe('PrisonerActivityEditCheck', () => {
  describe(`when the request is dependent on permission: ${permission}`, () => {
    describe('when permission is granted', () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest,
        user: { ...prisonUserMock, userRoles: [Role.ActivityHub] },
        prisoner: prisonerMock,
        baseCheckStatus: baseCheckStatusPass,
        expectedResult: true,
      })
    })

    describe(`when the base check fails with ${baseCheckStatusFail}`, () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest,
        user: { ...prisonUserMock, userRoles: [Role.ActivityHub] },
        prisoner: prisonerMock,
        baseCheckStatus: baseCheckStatusFail,
        expectedResult: false,
        expectedStatusLogged: baseCheckStatusFail,
      })
    })

    describe(`when the prisoner's prison doesn't match the active caseload`, () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest,
        user: {
          ...prisonUserMock,
          userRoles: [Role.ActivityHub],
          caseLoads: [
            { caseLoadId: 'MDI', currentlyActive: true } as CaseLoad,
            { caseLoadId: 'LEI', currentlyActive: false } as CaseLoad,
          ],
          activeCaseLoadId: 'MDI',
        },
        prisoner: { ...prisonerMock, prisonId: 'LEI' },
        baseCheckStatus: baseCheckStatusPass,
        expectedResult: false,
        expectedStatusLogged: PermissionCheckStatus.NOT_ACTIVE_CASELOAD,
      })
    })

    describe(`when the user doesn't have the activity hub role`, () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest,
        user: {
          ...prisonUserMock,
          userRoles: [],
        },
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
