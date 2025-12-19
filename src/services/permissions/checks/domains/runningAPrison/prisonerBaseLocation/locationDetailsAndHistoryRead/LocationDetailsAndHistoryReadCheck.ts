import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'
import {
  isInUsersCaseLoad,
  isReleased,
  isTransferring,
  logDeniedPermissionCheck,
} from '../../../../../utils/PermissionUtils'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import restrictedPatientStatus from '../../../../baseCheck/status/RestrictedPatientStatus'
import releasedPrisonerStatus from '../../../../baseCheck/status/ReleasedPrisonerStatus'
import transferringPrisonerStatus from '../../../../baseCheck/status/TransferringPrisonerStatus'

export default function locationDetailsAndHistoryReadCheck(
  permission: PrisonerPermission,
  request: PermissionsCheckContext,
) {
  const baseCheckPassed = request.baseCheckStatus === PermissionStatus.OK

  const locationDetailsAndHistoryCheckStatus = checkLocationDetailsAndHistoryAccess(request)
  const locationDetailsAndHistoryCheckPassed = locationDetailsAndHistoryCheckStatus === PermissionStatus.OK

  const check = baseCheckPassed && locationDetailsAndHistoryCheckPassed

  if (!check) logDeniedPermissionCheck(permission, request, locationDetailsAndHistoryCheckStatus)

  return check
}

export function checkLocationDetailsAndHistoryAccess(request: PermissionsCheckContext) {
  const { user, prisoner } = request
  const inUsersCaseLoad = isInUsersCaseLoad(prisoner.prisonId, user)

  // Follows the base check:
  if (prisoner.restrictedPatient) return restrictedPatientStatus(user, prisoner)
  if (isReleased(prisoner)) return releasedPrisonerStatus(user, prisoner)
  if (isTransferring(prisoner)) return transferringPrisonerStatus(user, prisoner)

  if (inUsersCaseLoad) return PermissionStatus.OK

  // Global Search access not allowed:
  return PermissionStatus.NOT_IN_CASELOAD
}
