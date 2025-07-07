import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import baseCheckAndInUsersCaseLoad from '../baseCheckAndInUsersCaseLoad/BaseCheckAndInUsersCaseLoad'

export default function prisonerProfileEditCheck(permission: PrisonerPermission, request: PermissionsCheckRequest) {
  return baseCheckAndInUsersCaseLoad(permission, request)
}
