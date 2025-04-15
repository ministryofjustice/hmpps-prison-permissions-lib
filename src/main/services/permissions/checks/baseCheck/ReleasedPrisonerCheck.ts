import { HmppsUser } from '../../../../types/user/HmppsUser'
import Prisoner from '../../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import {
  PrisonerBasePermission,
  PrisonerPermission,
  PrisonerPermissionOperation,
} from '../../../../types/permissions/prisoner/PrisonerPermissions'
import { Operations } from '../../../../types/permissions/Operations'
import { isInUsersCaseLoad, userHasRoles } from '../../utils/PermissionUtils'
import { Role } from '../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../types/permissions/PermissionCheckStatus'
import PermissionsLogger from '../../PermissionsLogger'

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
