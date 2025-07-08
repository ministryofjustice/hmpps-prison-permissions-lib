import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import baseCheckAndInActiveCaseLoad from '../baseCheckAndInActiveCaseLoad/BaseCheckAndInActiveCaseLoad'

export default function prisonerProfileEditCheck(permission: PrisonerPermission, request: PermissionsCheckRequest) {
  return baseCheckAndInActiveCaseLoad(permission, request)
}
