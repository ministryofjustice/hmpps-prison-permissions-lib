import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PersonProtectedCharacteristicsPermission } from './PersonProtectedCharacteristicsPermissions'

const basePath: Path<PrisonerPermissions> = 'domainGroups.person.personProtectedCharacteristics'

// eslint-disable-next-line import/prefer-default-export
export const personProtectedCharacteristicsPermissionPaths: Record<
  PersonProtectedCharacteristicsPermission,
  Path<PrisonerPermissions>
> = {
  [PersonProtectedCharacteristicsPermission.read_sexual_orientation]: `${basePath}.${PersonProtectedCharacteristicsPermission.read_sexual_orientation}`,
  [PersonProtectedCharacteristicsPermission.edit_sexual_orientation]: `${basePath}.${PersonProtectedCharacteristicsPermission.edit_sexual_orientation}`,

  [PersonProtectedCharacteristicsPermission.read_religion_and_belief]: `${basePath}.${PersonProtectedCharacteristicsPermission.read_religion_and_belief}`,
  [PersonProtectedCharacteristicsPermission.edit_religion_and_belief]: `${basePath}.${PersonProtectedCharacteristicsPermission.edit_religion_and_belief}`,

  [PersonProtectedCharacteristicsPermission.read_ethnicity]: `${basePath}.${PersonProtectedCharacteristicsPermission.read_ethnicity}`,
  [PersonProtectedCharacteristicsPermission.edit_ethnicity]: `${basePath}.${PersonProtectedCharacteristicsPermission.edit_ethnicity}`,
}
