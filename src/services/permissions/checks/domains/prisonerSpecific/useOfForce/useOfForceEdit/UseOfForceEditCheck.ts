import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { userHasRole } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'
import { HmppsUser } from '../../../../../../../types/internal/user/HmppsUser'

const requiresInactiveBookingRole = (user: HmppsUser) =>
  userHasRole(Role.InactiveBookings, user) ? PermissionCheckStatus.OK : PermissionCheckStatus.NOT_IN_CASELOAD

const useOfForceEditCheck = matchBaseCheckAnd({
  ifRestrictedPatient: () => PermissionCheckStatus.NOT_IN_CASELOAD,
  ifReleasedPrisoner: requiresInactiveBookingRole,
  ifTransferringPrisoner: requiresInactiveBookingRole,
  ifPrisonNotInCaseload: () => PermissionCheckStatus.NOT_IN_CASELOAD,
  ifPrisonInCaseload: () => PermissionCheckStatus.OK,
})

export default useOfForceEditCheck
