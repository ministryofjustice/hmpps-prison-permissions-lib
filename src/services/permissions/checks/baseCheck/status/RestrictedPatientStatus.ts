import { HmppsUser } from '../../../../../types/internal/user/HmppsUser'
import Prisoner from '../../../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { isInUsersCaseLoad, userHasRole } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'

/*
 * Restricted patients can be accessed in the following circumstances:
 * - The user has the "Inactive Bookings" role
 * - The user is a POM user and has the supporting prison ID in their caseloads
 */
export default function restrictedPatientStatus(user: HmppsUser, prisoner: Prisoner): PermissionCheckStatus {
  const pomUser = userHasRole(Role.PomUser, user)
  const inactiveBookingsUser = userHasRole(Role.InactiveBookings, user)

  const userHasPrisonersSupportingPrisonInTheirCaseLoad = isInUsersCaseLoad(prisoner.supportingPrisonId, user)
  const userIsPomUserWithSupportingPrisonInTheirCaseLoad = pomUser && userHasPrisonersSupportingPrisonInTheirCaseLoad

  if (userIsPomUserWithSupportingPrisonInTheirCaseLoad) return PermissionCheckStatus.OK
  if (inactiveBookingsUser) return PermissionCheckStatus.OK

  return PermissionCheckStatus.RESTRICTED_PATIENT
}
