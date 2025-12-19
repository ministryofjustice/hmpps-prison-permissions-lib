import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckContext from '../../PermissionsCheckContext'
import { Role } from '../../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasRole from '../inActiveCaseLoadAndUserHasRole/InActiveCaseLoadAndUserHasRole'

export default function prisonerProfileSensitiveEditCheck(
  permission: PrisonerPermission,
  request: PermissionsCheckContext,
) {
  return inActiveCaseLoadAndUserHasRole(Role.PrisonerProfileSensitiveEdit, permission, request)
}
