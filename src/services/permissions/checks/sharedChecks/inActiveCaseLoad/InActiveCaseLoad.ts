import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckContext from '../../PermissionsCheckContext'
import inActiveCaseLoadAndUserHasSomeRolesFrom from '../inActiveCaseLoadAndUserHasSomeRolesFrom/InActiveCaseLoadAndUserHasSomeRolesFrom'

export default function inActiveCaseLoad(permission: PrisonerPermission, request: PermissionsCheckContext) {
  return inActiveCaseLoadAndUserHasSomeRolesFrom([], permission, request)
}
