import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { Role } from '../../../../../types/internal/user/Role'
import inUsersCaseLoadAndUserHasSomeRolesFrom from '../inUsersCaseLoadAndUserHasSomeRolesFrom/InUsersCaseLoadAndUserHasSomeRolesFrom'

export default function inUsersCaseLoadAndUserHasRole(
  role: Role,
  permission: PrisonerPermission,
  request: PermissionsCheckRequest,
) {
  return inUsersCaseLoadAndUserHasSomeRolesFrom([role], permission, request)
}
