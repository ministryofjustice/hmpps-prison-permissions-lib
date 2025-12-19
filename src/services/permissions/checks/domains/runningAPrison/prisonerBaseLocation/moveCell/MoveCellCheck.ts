import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'
import { logDeniedPermissionCheck, userHasRole } from '../../../../../utils/PermissionUtils'
import { checkLocationDetailsAndHistoryAccess } from '../locationDetailsAndHistoryRead/LocationDetailsAndHistoryReadCheck'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PrisonerBaseLocationPermission } from '../../../../../../../types/public/permissions/domains/runningAPrison/prisonerBaseLocation/PrisonerBaseLocationPermissions'

const permission = PrisonerBaseLocationPermission.move_cell

export default function moveCellCheck(context: PermissionsCheckContext) {
  const baseCheckPassed = context.baseCheckStatus === PermissionStatus.OK

  const hasCellMoveRole = userHasRole(Role.CellMove, context.user)
  const locationDetailsAndHistoryCheckStatus = checkLocationDetailsAndHistoryAccess(context)
  const locationDetailsAndHistoryCheckPassed = locationDetailsAndHistoryCheckStatus === PermissionStatus.OK

  const check = baseCheckPassed && hasCellMoveRole && locationDetailsAndHistoryCheckPassed

  if (!check)
    logDeniedPermissionCheck(
      permission,
      context,
      hasCellMoveRole ? locationDetailsAndHistoryCheckStatus : PermissionStatus.ROLE_NOT_PRESENT,
    )

  return check
}
