import { PrisonerPermission } from '../../../../../types/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../types/permissions/PermissionCheckStatus'
import { logDeniedPermissionCheck, userHasRole } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/user/Role'

export default function baseCheckAndUserHasRole(
  role: Role,
  permission: PrisonerPermission,
  request: PermissionsCheckRequest,
) {
  const { user, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const check = baseCheckPassed && userHasRole(role, user.userRoles)

  if (!check) logDeniedPermissionCheck(permission, request, PermissionCheckStatus.ROLE_NOT_PRESENT)

  return check
}
