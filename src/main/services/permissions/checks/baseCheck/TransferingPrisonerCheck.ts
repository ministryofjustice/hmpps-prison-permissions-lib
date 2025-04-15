import { HmppsUser } from '../../../../types/user/HmppsUser'
import { userHasRoles } from '../../utils/PermissionUtils'
import { Role } from '../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../types/permissions/PermissionCheckStatus'

/*
 * Transferring prisoners can be accessed in the following circumstances:
 * - The user has the "Global search" role
 * - The user has the "Inactive Bookings" role
 */
export default function transferringPrisonerCheck(user: HmppsUser): PermissionCheckStatus {
  const { userRoles } = user
  const inactiveBookingsUser = userHasRoles([Role.InactiveBookings], userRoles)
  const globalSearchUser = userHasRoles([Role.GlobalSearch], userRoles)

  if (globalSearchUser) return PermissionCheckStatus.OK
  if (inactiveBookingsUser) return PermissionCheckStatus.OK

  return PermissionCheckStatus.PRISONER_IS_TRANSFERRING
}
