import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import xrbsReadCheck from './xrbsRead/XRBSReadCheck'
import {
  XRayBodyScansPermission,
  XRayBodyScansPermissions,
} from '../../../../../../types/public/permissions/domains/person/xRayBodyScans/XRayBodyScansPermissions'
import xrbsEditCheck from './xrbsEdit/XRBSEditCheck'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function xRayBodyScansCheck(context: PrisonerPermissionsContext): XRayBodyScansPermissions {
  const check = checkWith(context)
  return {
    ...check(XRayBodyScansPermission.read_scans, xrbsReadCheck),
    ...check(XRayBodyScansPermission.edit_scans, xrbsEditCheck),
  }
}
