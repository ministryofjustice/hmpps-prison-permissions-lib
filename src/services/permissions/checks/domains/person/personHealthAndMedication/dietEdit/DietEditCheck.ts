import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import baseCheckAndUserHasRole from '../../../../sharedChecks/baseCheckAndUserHasRole/BaseCheckAndUserHasRole'
import { PersonHealthAndMedicationPermission } from '../../../../../../../types/public/permissions/domains/person/personHealthAndMedication/PersonHealthAndMedicationPermissions'
import { Role } from '../../../../../../../types/internal/user/Role'

const permission = PersonHealthAndMedicationPermission.edit_diet

export default function dietEditCheck(request: PermissionsCheckRequest) {
  return baseCheckAndUserHasRole(Role.DietAndAllergiesEdit, permission, request)
}
