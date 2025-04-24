import { HmppsUser } from '../../../../types/user/HmppsUser'
import { userHasRoles } from '../../utils/PermissionUtils'
import { Role } from '../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../types/permissions/PermissionCheckStatus'

/*
 * Released prisoners can be accessed in the following circumstances:
 * - The user has the "Inactive Bookings" role
 */
export default function releasedPrisonerCheck(user: HmppsUser): PermissionCheckStatus {
  const { userRoles } = user
  const inactiveBookingsUser = userHasRoles([Role.InactiveBookings], userRoles)

  if (inactiveBookingsUser) return PermissionCheckStatus.OK

  return PermissionCheckStatus.PRISONER_IS_RELEASED
}
