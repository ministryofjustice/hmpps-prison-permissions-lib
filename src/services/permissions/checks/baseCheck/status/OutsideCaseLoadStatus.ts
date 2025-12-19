import { userHasSomeRolesFrom } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'
import { PermissionStatus } from '../../../../../types/internal/permissions/PermissionStatus'

/*
 * Prisoners in prisons outside the user's caseload can be accessed in the following circumstances:
 * - The user has the "Global search" role
 */
const outsideCaseLoadStatus: PermissionCheck = context => {
  const globalSearchUser = userHasSomeRolesFrom([Role.GlobalSearch], context.user)

  if (globalSearchUser) return PermissionStatus.OK

  return PermissionStatus.NOT_IN_CASELOAD
}

export default outsideCaseLoadStatus
