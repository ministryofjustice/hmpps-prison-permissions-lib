import { userHasRole, userHasSomeRolesFrom } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'
import { PermissionStatus } from '../../../../../types/internal/permissions/PermissionStatus'
import { SituationalCheck } from '../../GetStatus'

/*
 * Transferring prisoners can be accessed in the following circumstances:
 * - The user has the "Global search" role
 * - The user has the "Inactive Bookings" role
 */
const transferringPrisonerStatus: SituationalCheck = (user, _) => {
  const inactiveBookingsUser = userHasRole(Role.InactiveBookings, user)
  const globalSearchUser = userHasSomeRolesFrom([Role.GlobalSearch], user)

  if (globalSearchUser) return PermissionStatus.OK
  if (inactiveBookingsUser) return PermissionStatus.OK

  return PermissionStatus.PRISONER_IS_TRANSFERRING
}

export default transferringPrisonerStatus
