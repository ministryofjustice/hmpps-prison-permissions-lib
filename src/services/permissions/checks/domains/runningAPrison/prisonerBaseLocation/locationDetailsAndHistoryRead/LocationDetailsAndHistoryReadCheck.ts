import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { isInUsersCaseLoad, logDeniedPermissionCheck } from '../../../../../utils/PermissionUtils'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import restrictedPatientStatus from '../../../../baseCheck/status/RestrictedPatientStatus'
import releasedPrisonerStatus from '../../../../baseCheck/status/ReleasedPrisonerStatus'
import transferringPrisonerStatus from '../../../../baseCheck/status/TransferringPrisonerStatus'

export default function locationDetailsAndHistoryReadCheck(
  permission: PrisonerPermission,
  request: PermissionsCheckRequest,
) {
  const baseCheckPassed = request.baseCheckStatus === PermissionCheckStatus.OK

  const locationDetailsAndHistoryCheckStatus = checkLocationDetailsAndHistoryAccess(request)
  const locationDetailsAndHistoryCheckPassed = locationDetailsAndHistoryCheckStatus === PermissionCheckStatus.OK

  const check = baseCheckPassed && locationDetailsAndHistoryCheckPassed

  if (!check) logDeniedPermissionCheck(permission, request, locationDetailsAndHistoryCheckStatus)

  return check
}

export function checkLocationDetailsAndHistoryAccess(request: PermissionsCheckRequest) {
  const { user, prisoner } = request
  const inUsersCaseLoad = isInUsersCaseLoad(prisoner.prisonId, user)

  // Follows the base check:
  if (prisoner.restrictedPatient) return restrictedPatientStatus(user, prisoner)
  if (prisoner.prisonId === 'OUT') return releasedPrisonerStatus(user)
  if (prisoner.prisonId === 'TRN') return transferringPrisonerStatus(user)

  if (inUsersCaseLoad) return PermissionCheckStatus.OK

  // Global Search access not allowed:
  return PermissionCheckStatus.NOT_IN_CASELOAD
}
