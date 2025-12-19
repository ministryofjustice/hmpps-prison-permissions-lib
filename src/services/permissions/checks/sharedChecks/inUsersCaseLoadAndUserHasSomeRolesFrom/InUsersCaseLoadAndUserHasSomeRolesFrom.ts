import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckContext from '../../PermissionsCheckContext'
import { PermissionStatus } from '../../../../../types/internal/permissions/PermissionStatus'
import { isInUsersCaseLoad, logDeniedPermissionCheck, userHasSomeRolesFrom } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'

export default function inUsersCaseLoadAndUserHasSomeRolesFrom(
  roles: Role[],
  permission: PrisonerPermission,
  request: PermissionsCheckContext,
) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionStatus.OK
  const inUsersCaseLoad = isInUsersCaseLoad(prisoner.prisonId, user)
  const hasRole = userHasSomeRolesFrom(roles, user)

  const check = baseCheckPassed && inUsersCaseLoad && hasRole

  if (!check)
    logDeniedPermissionCheck(
      permission,
      request,
      inUsersCaseLoad ? PermissionStatus.ROLE_NOT_PRESENT : PermissionStatus.NOT_IN_CASELOAD,
    )

  return check
}
