import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import inActiveCaseLoad from '../inActiveCaseLoad/InActiveCaseLoad'

export default function prisonerProfileEditCheck(permission: PrisonerPermission, request: PermissionsCheckRequest) {
  return inActiveCaseLoad(permission, request)
}
