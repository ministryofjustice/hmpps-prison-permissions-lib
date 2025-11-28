import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import {
  isInUsersCaseLoad,
  isReleased,
  isTransferring,
  logDeniedPermissionCheck,
  userHasRole,
} from '../../../../../utils/PermissionUtils'
import restrictedPatientStatus from '../../../../baseCheck/status/RestrictedPatientStatus'
import releasedPrisonerStatus from '../../../../baseCheck/status/ReleasedPrisonerStatus'
import { Role } from '../../../../../../../types/internal/user/Role'
import { CorePersonRecordPermission } from '../../../../../../../types/public/permissions/domains/person/corePersonRecord/CorePersonRecordPermissions'

const permission = CorePersonRecordPermission.read_photo

export default function photoReadCheck(request: PermissionsCheckRequest) {
  const baseCheckPassed = request.baseCheckStatus === PermissionCheckStatus.OK

  const photoCheckStatus = checkPhotoAccess(request)
  const photoCheckPassed = photoCheckStatus === PermissionCheckStatus.OK

  const check = baseCheckPassed && photoCheckPassed

  if (!check) logDeniedPermissionCheck(permission, request, photoCheckStatus)

  return check
}

function checkPhotoAccess(request: PermissionsCheckRequest): PermissionCheckStatus {
  const { user, prisoner } = request

  // Restricted patients follows the base check rules:
  if (prisoner.restrictedPatient) return restrictedPatientStatus(user, prisoner)

  // Released prisoners follows the base check rules:
  if (isReleased(prisoner)) return releasedPrisonerStatus(user)

  // Photos are only accessible for transferring prisoners if the user has the Inactive Bookings role
  // (Global Search is NOT sufficient):
  if (isTransferring(prisoner)) {
    return userHasRole(Role.InactiveBookings, user)
      ? PermissionCheckStatus.OK
      : PermissionCheckStatus.PRISONER_IS_TRANSFERRING
  }

  // Global search does NOT permit access to photo:
  return isInUsersCaseLoad(prisoner.prisonId, user) ? PermissionCheckStatus.OK : PermissionCheckStatus.NOT_IN_CASELOAD
}
