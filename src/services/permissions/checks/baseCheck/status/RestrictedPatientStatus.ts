import { isInUsersCaseLoad, userHasRole } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'
import { PermissionStatus } from '../../../../../types/internal/permissions/PermissionStatus'
import { PermissionStatusFunction } from '../../../../../types/internal/permissions/PermissionContext'

/*
 * Restricted patients can be accessed in the following circumstances:
 * - The user has the "Inactive Bookings" role
 * - The user is a POM user and has the supporting prison ID in their caseloads
 */
const restrictedPatientStatus: PermissionStatusFunction = context => {
  const { user, prisoner } = context
  const pomUser = userHasRole(Role.PomUser, user)
  const inactiveBookingsUser = userHasRole(Role.InactiveBookings, user)

  const userHasPrisonersSupportingPrisonInTheirCaseLoad = isInUsersCaseLoad(prisoner.supportingPrisonId, user)
  const userIsPomUserWithSupportingPrisonInTheirCaseLoad = pomUser && userHasPrisonersSupportingPrisonInTheirCaseLoad

  if (userIsPomUserWithSupportingPrisonInTheirCaseLoad) return PermissionStatus.OK
  if (inactiveBookingsUser) return PermissionStatus.OK

  return PermissionStatus.RESTRICTED_PATIENT
}

export default restrictedPatientStatus
