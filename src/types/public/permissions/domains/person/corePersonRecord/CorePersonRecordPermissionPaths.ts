import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { CorePersonRecordPermission } from './CorePersonRecordPermissions'

const basePath: Path<PrisonerPermissions> = 'domainGroups.person.corePersonRecord'

// eslint-disable-next-line import/prefer-default-export
export const corePersonRecordPermissionPaths: Record<CorePersonRecordPermission, Path<PrisonerPermissions>> = {
  [CorePersonRecordPermission.read_physical_characteristics]: `${basePath}.${CorePersonRecordPermission.read_physical_characteristics}`,
  [CorePersonRecordPermission.edit_physical_characteristics]: `${basePath}.${CorePersonRecordPermission.edit_physical_characteristics}`,

  [CorePersonRecordPermission.read_photo]: `${basePath}.${CorePersonRecordPermission.read_photo}`,
  [CorePersonRecordPermission.edit_photo]: `${basePath}.${CorePersonRecordPermission.edit_photo}`,

  [CorePersonRecordPermission.read_place_of_birth]: `${basePath}.${CorePersonRecordPermission.read_place_of_birth}`,
  [CorePersonRecordPermission.edit_place_of_birth]: `${basePath}.${CorePersonRecordPermission.edit_place_of_birth}`,

  [CorePersonRecordPermission.read_military_history]: `${basePath}.${CorePersonRecordPermission.read_military_history}`,
  [CorePersonRecordPermission.edit_military_history]: `${basePath}.${CorePersonRecordPermission.edit_military_history}`,

  [CorePersonRecordPermission.read_name_and_aliases]: `${basePath}.${CorePersonRecordPermission.read_name_and_aliases}`,
  [CorePersonRecordPermission.edit_name_and_aliases]: `${basePath}.${CorePersonRecordPermission.edit_name_and_aliases}`,

  [CorePersonRecordPermission.read_date_of_birth]: `${basePath}.${CorePersonRecordPermission.read_date_of_birth}`,
  [CorePersonRecordPermission.edit_date_of_birth]: `${basePath}.${CorePersonRecordPermission.edit_date_of_birth}`,

  [CorePersonRecordPermission.read_address]: `${basePath}.${CorePersonRecordPermission.read_address}`,
  [CorePersonRecordPermission.edit_address]: `${basePath}.${CorePersonRecordPermission.edit_address}`,

  [CorePersonRecordPermission.read_nationality]: `${basePath}.${CorePersonRecordPermission.read_nationality}`,
  [CorePersonRecordPermission.edit_nationality]: `${basePath}.${CorePersonRecordPermission.edit_nationality}`,

  [CorePersonRecordPermission.read_identifiers]: `${basePath}.${CorePersonRecordPermission.read_identifiers}`,
  [CorePersonRecordPermission.edit_identifiers]: `${basePath}.${CorePersonRecordPermission.edit_identifiers}`,
}
