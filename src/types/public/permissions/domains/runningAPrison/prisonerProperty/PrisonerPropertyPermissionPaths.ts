import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PrisonerPropertyPermission } from './PrisonerPropertyPermissions'

// eslint-disable-next-line import/prefer-default-export
export const prisonerPropertyPermissionPaths: Record<PrisonerPropertyPermission, Path<PrisonerPermissions>> = {
  [PrisonerPropertyPermission.read_property_overview]: `domainGroups.runningAPrison.prisonerProperty.${PrisonerPropertyPermission.read_property_overview}`,
  [PrisonerPropertyPermission.read_property_details]: `domainGroups.runningAPrison.prisonerProperty.${PrisonerPropertyPermission.read_property_details}`,
  [PrisonerPropertyPermission.edit_property_details]: `domainGroups.runningAPrison.prisonerProperty.${PrisonerPropertyPermission.edit_property_details}`,
}
