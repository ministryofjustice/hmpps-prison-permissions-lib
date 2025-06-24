import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import baseCheck from '../../baseCheck/BaseCheck'

export default function prisonerProfileEditCheck(permission: PrisonerPermission, request: PermissionsCheckRequest) {
  return baseCheck(permission, request)
}
