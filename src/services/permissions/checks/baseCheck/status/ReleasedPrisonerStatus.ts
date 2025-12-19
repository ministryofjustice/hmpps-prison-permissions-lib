import { userHasRole } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'
import { PermissionStatus } from '../../../../../types/internal/permissions/PermissionStatus'
import { SituationalCheck } from '../../GetStatus'

/*
 * Released prisoners can be accessed in the following circumstances:
 * - The user has the "Inactive Bookings" role
 */
const releasedPrisonerStatus: SituationalCheck = (user, _) => {
  const inactiveBookingsUser = userHasRole(Role.InactiveBookings, user)

  if (inactiveBookingsUser) return PermissionStatus.OK

  return PermissionStatus.PRISONER_IS_RELEASED
}

export default releasedPrisonerStatus
