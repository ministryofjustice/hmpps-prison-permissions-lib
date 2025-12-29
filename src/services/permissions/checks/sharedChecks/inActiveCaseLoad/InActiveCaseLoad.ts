import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'
import inActiveCaseLoadAndUserHasSomeRolesFrom from '../inActiveCaseLoadAndUserHasSomeRolesFrom/InActiveCaseLoadAndUserHasSomeRolesFrom'

export default function inActiveCaseLoad(permission: PrisonerPermission, context: PrisonerPermissionsContext) {
  return inActiveCaseLoadAndUserHasSomeRolesFrom([])(permission, context)
}
