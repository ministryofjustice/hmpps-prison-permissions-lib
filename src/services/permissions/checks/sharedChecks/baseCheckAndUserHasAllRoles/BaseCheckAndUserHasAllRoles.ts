import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'
import { logDeniedPermissionCheck, userHasAllRoles } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'

export default function baseCheckAndUserHasAllRoles(
  roles: Role[],
  permission: PrisonerPermission,
  request: PermissionsCheckRequest,
) {
  const { user, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const check = baseCheckPassed && userHasAllRoles(roles, user)

  if (!check) logDeniedPermissionCheck(permission, request, PermissionCheckStatus.ROLE_NOT_PRESENT)

  return check
}
