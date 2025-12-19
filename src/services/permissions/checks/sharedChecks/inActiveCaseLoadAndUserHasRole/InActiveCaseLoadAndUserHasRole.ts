import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckContext from '../../PermissionsCheckContext'
import { Role } from '../../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasSomeRolesFrom from '../inActiveCaseLoadAndUserHasSomeRolesFrom/InActiveCaseLoadAndUserHasSomeRolesFrom'

export default function inActiveCaseLoadAndUserHasRole(
  role: Role,
  permission: PrisonerPermission,
  request: PermissionsCheckContext,
) {
  return inActiveCaseLoadAndUserHasSomeRolesFrom([role], permission, request)
}
