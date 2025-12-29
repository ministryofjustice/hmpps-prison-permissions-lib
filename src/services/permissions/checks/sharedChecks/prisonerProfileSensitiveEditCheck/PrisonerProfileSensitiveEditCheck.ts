import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { Role } from '../../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasRole from '../inActiveCaseLoadAndUserHasRole/InActiveCaseLoadAndUserHasRole'

export default function prisonerProfileSensitiveEditCheck(
  permission: PrisonerPermission,
  context: PrisonerPermissionsContext,
) {
  return inActiveCaseLoadAndUserHasRole(Role.PrisonerProfileSensitiveEdit)(permission, context)
}
