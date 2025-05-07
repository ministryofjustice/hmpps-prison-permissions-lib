import { PrisonerPermission } from '../../../../../types/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { Role } from '../../../../../types/user/Role'
import baseCheckAndUserHasAllRoles from './BaseCheckAndUserHasAllRoles'

export default function baseCheckAndUserHasRole(
  role: Role,
  permission: PrisonerPermission,
  request: PermissionsCheckRequest,
) {
  return baseCheckAndUserHasAllRoles([role], permission, request)
}
