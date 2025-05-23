import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import baseCheckAndUserHasRole from '../baseCheckAndUserHasRole/BaseCheckAndUserHasRole'
import { Role } from '../../../../../types/internal/user/Role'

export default function prisonerProfileEditCheck(permission: PrisonerPermission, request: PermissionsCheckRequest) {
  return baseCheckAndUserHasRole(Role.DPSApplicationDeveloper, permission, request)
}
