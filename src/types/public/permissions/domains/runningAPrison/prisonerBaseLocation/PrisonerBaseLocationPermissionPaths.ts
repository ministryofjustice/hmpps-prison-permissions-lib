import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PrisonerBaseLocationPermission } from './PrisonerBaseLocationPermissions'

// eslint-disable-next-line import/prefer-default-export
export const prisonerBaseLocationPermissionPaths: Record<PrisonerBaseLocationPermission, Path<PrisonerPermissions>> = {
  [PrisonerBaseLocationPermission.read_location_details]: `domainGroups.runningAPrison.prisonerBaseLocation.${PrisonerBaseLocationPermission.read_location_details}`,
  [PrisonerBaseLocationPermission.read_location_history]: `domainGroups.runningAPrison.prisonerBaseLocation.${PrisonerBaseLocationPermission.read_location_history}`,
  [PrisonerBaseLocationPermission.move_cell]: `domainGroups.runningAPrison.prisonerBaseLocation.${PrisonerBaseLocationPermission.move_cell}`,
}
