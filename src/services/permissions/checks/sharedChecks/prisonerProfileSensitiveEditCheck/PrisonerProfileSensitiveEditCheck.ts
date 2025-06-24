import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import baseCheckAndUserHasRole from '../baseCheckAndUserHasRole/BaseCheckAndUserHasRole'
import { Role } from '../../../../../types/internal/user/Role'

export default function prisonerProfileSensitiveEditCheck(
  permission: PrisonerPermission,
  request: PermissionsCheckRequest,
) {
  return baseCheckAndUserHasRole(Role.PrisonerProfileSensitiveEdit, permission, request)
}
