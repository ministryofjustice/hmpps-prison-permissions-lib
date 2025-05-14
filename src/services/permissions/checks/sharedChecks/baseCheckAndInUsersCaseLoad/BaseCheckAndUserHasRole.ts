import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { Role } from '../../../../../types/internal/user/Role'
import baseCheckAndUserHasAllRoles from './BaseCheckAndUserHasAllRoles'

export default function baseCheckAndUserHasRole(
  role: Role,
  permission: PrisonerPermission,
  request: PermissionsCheckRequest,
) {
  return baseCheckAndUserHasAllRoles([role], permission, request)
}
