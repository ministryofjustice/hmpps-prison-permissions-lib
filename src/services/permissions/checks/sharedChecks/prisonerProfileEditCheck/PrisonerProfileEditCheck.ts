import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckContext from '../../PermissionsCheckContext'
import inActiveCaseLoad from '../inActiveCaseLoad/InActiveCaseLoad'

export default function prisonerProfileEditCheck(permission: PrisonerPermission, request: PermissionsCheckContext) {
  return inActiveCaseLoad(permission, request)
}
