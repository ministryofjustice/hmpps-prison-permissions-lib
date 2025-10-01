import { CaseNotesPermission } from '../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { PermissionCheckStatus } from '../../../../../../types/internal/permissions/PermissionCheckStatus'
import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import {
  isInUsersCaseLoad,
  logDeniedPermissionCheck,
  userHasAllRoles,
  userHasRole,
} from '../../../../utils/PermissionUtils'
import restrictedPatientStatus from '../../../baseCheck/status/RestrictedPatientStatus'
import releasedPrisonerStatus from '../../../baseCheck/status/ReleasedPrisonerStatus'
import { Role } from '../../../../../../types/internal/user/Role'
import { HmppsUser } from '../../../../../../types/internal/user/HmppsUser'
import Prisoner from '../../../../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { daysToMilliseconds, isDateWithinBounds } from '../../../../utils/DateUtils'

const caseNotesAccessPeriodPostTransferInMs = daysToMilliseconds(30)

export default function caseNotesReadAndEditCheck(permission: CaseNotesPermission, request: PermissionsCheckRequest) {
  const baseCheckPassed = request.baseCheckStatus === PermissionCheckStatus.OK

  const caseNotesCheckStatus = checkCaseNotesAccess(request)
  const caseNotesCheckPassed = caseNotesCheckStatus === PermissionCheckStatus.OK

  const check = baseCheckPassed && caseNotesCheckPassed

  if (!check) logDeniedPermissionCheck(permission, request, caseNotesCheckStatus)

  return check
}

function checkTimeBasedAccessToCaseNotesPostTransfer(
  user: HmppsUser,
  prisoner: Prisoner,
  timePeriodForAccessPostTransferInMilliseconds: number,
): boolean {
  if (!isInUsersCaseLoad(prisoner.previousPrisonId, user) || !prisoner.previousPrisonLeavingDate) return false

  const previousPrisonLeavingDate = Date.parse(prisoner.previousPrisonLeavingDate)
  const today = Date.now()

  return isDateWithinBounds(previousPrisonLeavingDate, today, today - timePeriodForAccessPostTransferInMilliseconds)
}

function checkCaseNotesAccess(request: PermissionsCheckRequest): PermissionCheckStatus {
  const { user, prisoner } = request

  // Restricted patients follows the base check rules:
  if (prisoner.restrictedPatient) return restrictedPatientStatus(user, prisoner)

  // Released prisoners follows the base check rules:
  if (prisoner.prisonId === 'OUT') return releasedPrisonerStatus(user)

  // Case notes are only accessible for transferring prisoners if the user has the Inactive Bookings role:
  if (prisoner.prisonId === 'TRN') {
    return userHasRole(Role.InactiveBookings, user)
      ? PermissionCheckStatus.OK
      : PermissionCheckStatus.PRISONER_IS_TRANSFERRING
  }

  // Case notes are accessible if the prisoner's prison is in the user's caseload:
  if (isInUsersCaseLoad(prisoner.prisonId, user)) return PermissionCheckStatus.OK

  if (!userHasAllRoles([Role.GlobalSearch, Role.PomUser], user)) return PermissionCheckStatus.ROLE_NOT_PRESENT

  // Case notes for prisoners outside the user's caseload are only accessible with both Global Search and POM roles if the prisoner
  // was previously in one of the users caseloads in the 30 days:
  return checkTimeBasedAccessToCaseNotesPostTransfer(user, prisoner, caseNotesAccessPeriodPostTransferInMs)
    ? PermissionCheckStatus.OK
    : PermissionCheckStatus.NOT_PERMITTED
}
