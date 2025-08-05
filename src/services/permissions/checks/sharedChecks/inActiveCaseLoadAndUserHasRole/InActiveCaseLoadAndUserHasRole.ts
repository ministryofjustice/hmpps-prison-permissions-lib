import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { Role } from '../../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasSomeRolesFrom from '../inActiveCaseLoadAndUserHasSomeRolesFrom/InActiveCaseLoadAndUserHasSomeRolesFrom'

export default function inActiveCaseLoadAndUserHasRole(
  role: Role,
  permission: PrisonerPermission,
  request: PermissionsCheckRequest,
) {
  return inActiveCaseLoadAndUserHasSomeRolesFrom([role], permission, request)
}
