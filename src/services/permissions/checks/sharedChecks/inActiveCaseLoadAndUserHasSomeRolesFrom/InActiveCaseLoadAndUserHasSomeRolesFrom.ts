import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckContext from '../../PermissionsCheckContext'
import { PermissionStatus } from '../../../../../types/internal/permissions/PermissionStatus'
import { isActiveCaseLoad, logDeniedPermissionCheck, userHasSomeRolesFrom } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'

export default function inActiveCaseLoadAndUserHasSomeRolesFrom(
  roles: Role[],
  permission: PrisonerPermission,
  request: PermissionsCheckContext,
) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionStatus.OK
  const inActiveCaseLoad = isActiveCaseLoad(prisoner.prisonId, user)
  const hasRole = userHasSomeRolesFrom(roles, user)

  const check = baseCheckPassed && inActiveCaseLoad && hasRole

  if (!check)
    logDeniedPermissionCheck(
      permission,
      request,
      inActiveCaseLoad ? PermissionStatus.ROLE_NOT_PRESENT : PermissionStatus.NOT_ACTIVE_CASELOAD,
    )

  return check
}
