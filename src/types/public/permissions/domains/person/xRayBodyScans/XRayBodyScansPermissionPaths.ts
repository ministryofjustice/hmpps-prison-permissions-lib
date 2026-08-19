import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { XRayBodyScansPermission } from './XRayBodyScansPermissions'

const basePath: Path<PrisonerPermissions> = 'domainGroups.person.xRayBodyScans'

// eslint-disable-next-line import/prefer-default-export
export const xRayBodyScansPermissionPaths: Record<XRayBodyScansPermission, Path<PrisonerPermissions>> = {
  [XRayBodyScansPermission.read_scans]: `${basePath}.${XRayBodyScansPermission.read_scans}`,
  [XRayBodyScansPermission.edit_scans]: `${basePath}.${XRayBodyScansPermission.edit_scans}`,
}
