import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckContext from '../../PermissionsCheckContext'
import { Role } from '../../../../../types/internal/user/Role'
import inUsersCaseLoadAndUserHasSomeRolesFrom from '../inUsersCaseLoadAndUserHasSomeRolesFrom/InUsersCaseLoadAndUserHasSomeRolesFrom'

export default function inUsersCaseLoadAndUserHasRole(
  role: Role,
  permission: PrisonerPermission,
  request: PermissionsCheckContext,
) {
  return inUsersCaseLoadAndUserHasSomeRolesFrom([role], permission, request)
}
