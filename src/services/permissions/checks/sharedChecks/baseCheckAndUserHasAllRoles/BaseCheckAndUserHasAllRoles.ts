import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckContext from '../../PermissionsCheckContext'
import { PermissionStatus } from '../../../../../types/internal/permissions/PermissionStatus'
import { logDeniedPermissionCheck, userHasAllRoles } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'

export default function baseCheckAndUserHasAllRoles(
  roles: Role[],
  permission: PrisonerPermission,
  context: PermissionsCheckContext,
) {
  const { user, baseCheckStatus } = context

  const baseCheckPassed = baseCheckStatus === PermissionStatus.OK
  const check = baseCheckPassed && userHasAllRoles(roles, user)

  if (!check) logDeniedPermissionCheck(permission, context, PermissionStatus.ROLE_NOT_PRESENT)

  return check
}
