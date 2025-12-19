import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { PrisonerAlertsPermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerAlerts/PrisonerAlertsPermissions'
import { Role } from '../../../../../../../types/internal/user/Role'
import {
  isInUsersCaseLoad,
  isReleased,
  isTransferring,
  logDeniedPermissionCheck,
  userHasRole,
} from '../../../../../utils/PermissionUtils'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'
import releasedPrisonerStatus from '../../../../baseCheck/status/ReleasedPrisonerStatus'
import restrictedPatientStatus from '../../../../baseCheck/status/RestrictedPatientStatus'

const permission = PrisonerAlertsPermission.edit

export default function prisonerAlertsEditCheck(request: PermissionsCheckContext) {
  const baseCheckPassed = request.baseCheckStatus === PermissionStatus.OK

  const alertsEditCheck = checkAlertsEditAccess(request)
  const alertsEditCheckPassed = alertsEditCheck === PermissionStatus.OK

  const check = baseCheckPassed && alertsEditCheckPassed

  if (!check) logDeniedPermissionCheck(permission, request, alertsEditCheck)

  return check
}

function checkAlertsEditAccess(request: PermissionsCheckContext): PermissionStatus {
  const { user, prisoner } = request
  const inUsersCaseLoad = isInUsersCaseLoad(prisoner.prisonId, user)

  // User must have Update Alert role:
  if (!userHasRole(Role.UpdateAlert, user)) return PermissionStatus.ROLE_NOT_PRESENT

  // Restricted patients follow the base check:
  if (prisoner.restrictedPatient) return restrictedPatientStatus(user, prisoner)

  // Released prisoners follow base check:
  if (isReleased(prisoner)) return releasedPrisonerStatus(user, prisoner)

  // For transferring prisoners, only the Inactive Bookings role is acceptable,
  // Global Search role is not sufficient:
  if (isTransferring(prisoner)) {
    return userHasRole(Role.InactiveBookings, user) ? PermissionStatus.OK : PermissionStatus.PRISONER_IS_TRANSFERRING
  }

  if (inUsersCaseLoad) return PermissionStatus.OK

  // Global Search role is not sufficient for prisoners outside of user's caseload:
  return PermissionStatus.NOT_IN_CASELOAD
}
