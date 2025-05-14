import { HmppsUser } from '../../../../../types/internal/user/HmppsUser'
import { userHasRole, userHasSomeRolesFrom } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'

/*
 * Transferring prisoners can be accessed in the following circumstances:
 * - The user has the "Global search" role
 * - The user has the "Inactive Bookings" role
 */
export default function transferringPrisonerStatus(user: HmppsUser): PermissionCheckStatus {
  const inactiveBookingsUser = userHasRole(Role.InactiveBookings, user)
  const globalSearchUser = userHasSomeRolesFrom([Role.GlobalSearch], user)

  if (globalSearchUser) return PermissionCheckStatus.OK
  if (inactiveBookingsUser) return PermissionCheckStatus.OK

  return PermissionCheckStatus.PRISONER_IS_TRANSFERRING
}
