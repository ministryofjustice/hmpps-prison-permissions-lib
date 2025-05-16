import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import {
  requestDependentOnPermissionTest,
  requestNotDependentOnPermissionTest,
} from '../../../../../../../testUtils/PermissionCheckTest'
import { prisonUserMock } from '../../../../../../../testUtils/UserMocks'
import { prisonerMock } from '../../../../../../../testUtils/PrisonerMocks'
import { PrisonerBaseLocationPermission } from '../../../../../../../types/public/permissions/domains/runningAPrison/prisonerBaseLocation/PrisonerBaseLocationPermissions'
import locationDetailsAndHistoryReadCheck from './LocationDetailsAndHistoryReadCheck'
import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { Role } from '../../../../../../../types/internal/user/Role'

const permission = PrisonerBaseLocationPermission.read_location_details
const checkUnderTest = (request: PermissionsCheckRequest) => locationDetailsAndHistoryReadCheck(permission, request)
const baseCheckStatusPass = PermissionCheckStatus.OK
const baseCheckStatusFail = PermissionCheckStatus.NOT_PERMITTED

describe('LocationDetailsAndHistoryReadCheck', () => {
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

    describe('when the user is accessing the prisoner using Global Search role', () => {
      requestDependentOnPermissionTest({
        permission,
        checkUnderTest,
        user: { ...prisonUserMock, userRoles: [Role.GlobalSearch] },
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
