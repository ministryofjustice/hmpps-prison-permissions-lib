import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { PersonHealthAndMedicationPermission } from '../../../../../../../types/public/permissions/domains/person/personHealthAndMedication/PersonHealthAndMedicationPermissions'
import { Role } from '../../../../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasRole from '../../../../sharedChecks/inActiveCaseLoadAndUserHasRole/InActiveCaseLoadAndUserHasRole'

const permission = PersonHealthAndMedicationPermission.edit_diet

export default function dietEditCheck(request: PermissionsCheckContext) {
  return inActiveCaseLoadAndUserHasRole(Role.DietAndAllergiesEdit, permission, request)
}
