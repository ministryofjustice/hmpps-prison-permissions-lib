import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PersonalRelationshipsPermission } from './PersonalRelationshipsPermissions'

const basePath: Path<PrisonerPermissions> = 'domainGroups.person.personalRelationships'

// eslint-disable-next-line import/prefer-default-export
export const personalRelationshipsPermissionPaths: Record<
  PersonalRelationshipsPermission,
  Path<PrisonerPermissions>
> = {
  [PersonalRelationshipsPermission.read_emergency_contacts]: `${basePath}.${PersonalRelationshipsPermission.read_emergency_contacts}`,
  [PersonalRelationshipsPermission.edit_emergency_contacts]: `${basePath}.${PersonalRelationshipsPermission.edit_emergency_contacts}`,
  [PersonalRelationshipsPermission.read_number_of_children]: `${basePath}.${PersonalRelationshipsPermission.read_number_of_children}`,
  [PersonalRelationshipsPermission.edit_number_of_children]: `${basePath}.${PersonalRelationshipsPermission.edit_number_of_children}`,
  [PersonalRelationshipsPermission.read_domestic_status]: `${basePath}.${PersonalRelationshipsPermission.read_domestic_status}`,
  [PersonalRelationshipsPermission.edit_domestic_status]: `${basePath}.${PersonalRelationshipsPermission.edit_domestic_status}`,
}
