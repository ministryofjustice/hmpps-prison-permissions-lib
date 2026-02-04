import { HmppsUser } from '../../../../../types/internal/user/HmppsUser'
import { userHasSomeRolesFrom } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'

/*
 * Released prisoners can be accessed in the following circumstances:
 * - The user has the "Inactive Bookings" role
 * - The user has the "Released Prisoner Viewing" role
 */
export default function releasedPrisonerStatus(user: HmppsUser): PermissionCheckStatus {
  const inactiveBookingsOrReleasedUser = userHasSomeRolesFrom([Role.InactiveBookings, Role.ReleasedPrisonerViewing], user)

  if (inactiveBookingsOrReleasedUser) return PermissionCheckStatus.OK

  return PermissionCheckStatus.PRISONER_IS_RELEASED
}
