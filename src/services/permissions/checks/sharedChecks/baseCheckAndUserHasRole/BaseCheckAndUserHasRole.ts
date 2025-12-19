import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckContext from '../../PermissionsCheckContext'
import { Role } from '../../../../../types/internal/user/Role'
import baseCheckAndUserHasAllRoles from '../baseCheckAndUserHasAllRoles/BaseCheckAndUserHasAllRoles'

export default function baseCheckAndUserHasRole(
  role: Role,
  permission: PrisonerPermission,
  request: PermissionsCheckContext,
) {
  return baseCheckAndUserHasAllRoles([role], permission, request)
}
