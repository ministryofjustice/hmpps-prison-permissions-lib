import { userHasSomeRolesFrom } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'
import { HmppsUser } from '../../../../../types/internal/user/HmppsUser'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'

/*
 * Prisoners in prisons outside the user's caseload can be accessed in the following circumstances:
 * - The user has the "Global search" role
 */
export default function prisonNotInCaseLoadStatus(user: HmppsUser): PermissionCheckStatus {
  const globalSearchUser = userHasSomeRolesFrom([Role.GlobalSearch], user)

  if (globalSearchUser) return PermissionCheckStatus.OK

  return PermissionCheckStatus.NOT_IN_CASELOAD
}
