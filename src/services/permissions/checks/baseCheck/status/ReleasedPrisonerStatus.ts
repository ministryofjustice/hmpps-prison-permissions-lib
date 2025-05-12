import { HmppsUser } from '../../../../../types/user/HmppsUser'
import { userHasRole } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../../types/permissions/PermissionCheckStatus'

/*
 * Released prisoners can be accessed in the following circumstances:
 * - The user has the "Inactive Bookings" role
 */
export default function releasedPrisonerStatus(user: HmppsUser): PermissionCheckStatus {
  const inactiveBookingsUser = userHasRole(Role.InactiveBookings, user)

  if (inactiveBookingsUser) return PermissionCheckStatus.OK

  return PermissionCheckStatus.PRISONER_IS_RELEASED
}
