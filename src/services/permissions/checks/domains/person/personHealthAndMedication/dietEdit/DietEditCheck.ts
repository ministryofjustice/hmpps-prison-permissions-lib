import PrisonerPermissionsContext from '../../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { Role } from '../../../../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasRole from '../../../../sharedChecks/inActiveCaseLoadAndUserHasRole/InActiveCaseLoadAndUserHasRole'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'

export default function dietEditCheck(permission: PrisonerPermission, context: PrisonerPermissionsContext) {
  return inActiveCaseLoadAndUserHasRole(Role.DietAndAllergiesEdit)(permission, context)
}
