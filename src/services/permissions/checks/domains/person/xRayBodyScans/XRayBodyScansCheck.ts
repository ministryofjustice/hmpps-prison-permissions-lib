import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import {
  XRayBodyScansPermission,
  XRayBodyScansPermissions,
} from '../../../../../../types/public/permissions/domains/person/xRayBodyScans/XRayBodyScansPermissions'
import { checkWith } from '../../../../utils/PermissionCheckUtils'
import xrbsReadAndEditCheck from './XRBSReadAndEditCheck'

export default function xRayBodyScansCheck(context: PrisonerPermissionsContext): XRayBodyScansPermissions {
  const check = checkWith(context)
  return {
    ...check(XRayBodyScansPermission.read_scans, xrbsReadAndEditCheck),
    ...check(XRayBodyScansPermission.edit_scans, xrbsReadAndEditCheck),
  }
}
