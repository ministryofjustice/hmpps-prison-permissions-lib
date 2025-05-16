import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PersonHealthAndMedicationPermission } from './PersonHealthAndMedicationPermissions'

const basePath: Path<PrisonerPermissions> = 'domainGroups.person.personHealthAndMedication'

// eslint-disable-next-line import/prefer-default-export
export const personHealthAndMedicationPermissionPaths: Record<
  PersonHealthAndMedicationPermission,
  Path<PrisonerPermissions>
> = {
  [PersonHealthAndMedicationPermission.read_pregnancy]: `${basePath}.${PersonHealthAndMedicationPermission.read_pregnancy}`,
  [PersonHealthAndMedicationPermission.edit_pregnancy]: `${basePath}.${PersonHealthAndMedicationPermission.edit_pregnancy}`,

  [PersonHealthAndMedicationPermission.read_diet]: `${basePath}.${PersonHealthAndMedicationPermission.read_diet}`,
  [PersonHealthAndMedicationPermission.edit_diet]: `${basePath}.${PersonHealthAndMedicationPermission.edit_diet}`,

  [PersonHealthAndMedicationPermission.read_smoker]: `${basePath}.${PersonHealthAndMedicationPermission.read_smoker}`,
  [PersonHealthAndMedicationPermission.edit_smoker]: `${basePath}.${PersonHealthAndMedicationPermission.edit_smoker}`,
}
