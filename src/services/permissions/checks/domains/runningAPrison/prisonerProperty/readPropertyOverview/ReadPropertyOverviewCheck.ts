import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { userHasRole } from '../../../../../utils/PermissionUtils'

/**
 * The rules for viewing the property overview follow the base check with one exception:
 * if the prisoner is a restricted patient, the user must have the Inactive Bookings (Release Prisoner Viewing) role.
 */
const readPropertyOverviewCheck = matchBaseCheckAnd({
  ifRestrictedPatient: user =>
    userHasRole(Role.InactiveBookings, user) ? PermissionCheckStatus.OK : PermissionCheckStatus.RESTRICTED_PATIENT,
})

export default readPropertyOverviewCheck
