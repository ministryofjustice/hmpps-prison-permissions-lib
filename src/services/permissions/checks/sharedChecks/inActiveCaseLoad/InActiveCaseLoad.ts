import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import inActiveCaseLoadAndUserHasSomeRolesFrom from '../inActiveCaseLoadAndUserHasSomeRolesFrom/InActiveCaseLoadAndUserHasSomeRolesFrom'

export default function inActiveCaseLoad(permission: PrisonerPermission, request: PermissionsCheckRequest) {
  return inActiveCaseLoadAndUserHasSomeRolesFrom([], permission, request)
}
