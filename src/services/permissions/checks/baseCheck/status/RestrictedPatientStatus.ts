import { HmppsUser } from '../../../../../types/user/HmppsUser'
import Prisoner from '../../../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { isInUsersCaseLoad, userHasRole } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../../types/permissions/PermissionCheckStatus'

/*
 * Restricted patients can be accessed in the following circumstances:
 * - The user has the "Inactive Bookings" role
 * - The user is a POM user and has the supporting prison ID in their caseloads
 */
export default function restrictedPatientStatus(user: HmppsUser, prisoner: Prisoner): PermissionCheckStatus {
  const { userRoles } = user
  const pomUser = userHasRole(Role.PomUser, userRoles)
  const inactiveBookingsUser = userHasRole(Role.InactiveBookings, userRoles)

  const userHasPrisonersSupportingPrisonInTheirCaseLoad = isInUsersCaseLoad(prisoner.supportingPrisonId, user)
  const userIsPomUserWithSupportingPrisonInTheirCaseLoad = pomUser && userHasPrisonersSupportingPrisonInTheirCaseLoad

  if (userIsPomUserWithSupportingPrisonInTheirCaseLoad) return PermissionCheckStatus.OK
  if (inactiveBookingsUser) return PermissionCheckStatus.OK

  return PermissionCheckStatus.RESTRICTED_PATIENT
}
