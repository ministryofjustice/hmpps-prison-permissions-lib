import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckContext from '../../PermissionsCheckContext'
import { PermissionStatus } from '../../../../../types/internal/permissions/PermissionStatus'
import { logDeniedPermissionCheck, userHasSomeRolesFrom } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'

export default function baseCheckAndUserHasSomeRolesFrom(
  roles: Role[],
  permission: PrisonerPermission,
  request: PermissionsCheckContext,
) {
  const { user, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionStatus.OK
  const check = baseCheckPassed && userHasSomeRolesFrom(roles, user)

  if (!check) logDeniedPermissionCheck(permission, request, PermissionStatus.ROLE_NOT_PRESENT)

  return check
}
