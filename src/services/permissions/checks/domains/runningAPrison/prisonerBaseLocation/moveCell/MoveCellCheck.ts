import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { logDeniedPermissionCheck, userHasRole } from '../../../../../utils/PermissionUtils'
import { checkLocationDetailsAndHistoryAccess } from '../locationDetailsAndHistoryRead/LocationDetailsAndHistoryReadCheck'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PrisonerBaseLocationPermission } from '../../../../../../../types/public/permissions/domains/runningAPrison/prisonerBaseLocation/PrisonerBaseLocationPermissions'

const permission = PrisonerBaseLocationPermission.move_cell

export default function moveCellCheck(request: PermissionsCheckRequest) {
  const baseCheckPassed = request.baseCheckStatus === PermissionCheckStatus.OK

  const hasCellMoveRole = userHasRole(Role.CellMove, request.user)
  const locationDetailsAndHistoryCheckStatus = checkLocationDetailsAndHistoryAccess(request)
  const locationDetailsAndHistoryCheckPassed = locationDetailsAndHistoryCheckStatus === PermissionCheckStatus.OK

  const check = baseCheckPassed && hasCellMoveRole && locationDetailsAndHistoryCheckPassed

  if (!check)
    logDeniedPermissionCheck(
      permission,
      request,
      hasCellMoveRole ? locationDetailsAndHistoryCheckStatus : PermissionCheckStatus.ROLE_NOT_PRESENT,
    )

  return check
}
