import { Role } from '../../../../../../../types/internal/user/Role'
import { userHasRole } from '../../../../../utils/PermissionUtils'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

const prisonerAlertsEditCheck = matchBaseCheckAnd({
  atLeastOneRoleRequiredFrom: [Role.UpdateAlert],

  // For transferring prisoners, only the Inactive Bookings role is acceptable,
  // Global Search role is not sufficient:
  ifTransferringPrisoner: user =>
    userHasRole(Role.InactiveBookings, user)
      ? PermissionCheckStatus.OK
      : PermissionCheckStatus.PRISONER_IS_TRANSFERRING,

  // Global search does NOT allow edit access to alerts for prisoners outside of user's caseload:
  ifPrisonNotInCaseload: () => PermissionCheckStatus.NOT_IN_CASELOAD,
})

export default prisonerAlertsEditCheck
