import { HmppsUser } from '../../../../../types/user/HmppsUser'
import { userHasSomeRolesFrom } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../../types/permissions/PermissionCheckStatus'

/*
 * Transferring prisoners can be accessed in the following circumstances:
 * - The user has the "Global search" role
 * - The user has the "Inactive Bookings" role
 */
export default function transferringPrisonerStatus(user: HmppsUser): PermissionCheckStatus {
  const { userRoles } = user
  const inactiveBookingsUser = userHasSomeRolesFrom([Role.InactiveBookings], userRoles)
  const globalSearchUser = userHasSomeRolesFrom([Role.GlobalSearch], userRoles)

  if (globalSearchUser) return PermissionCheckStatus.OK
  if (inactiveBookingsUser) return PermissionCheckStatus.OK

  return PermissionCheckStatus.PRISONER_IS_TRANSFERRING
}
