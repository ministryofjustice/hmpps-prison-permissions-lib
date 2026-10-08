import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'
import { PrisonerPermissionConditions } from '../../../../../PrisonerPermissionConditions'
import { HmppsUser } from '../../../../../../../types/internal/user/HmppsUser'
import { userHasRole } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/internal/user/Role'

const inactiveBookingsRoleRequired =
  (denyStatus: PermissionCheckStatus) =>
  (user: HmppsUser): PermissionCheckStatus =>
    userHasRole(Role.InactiveBookings, user) ? PermissionCheckStatus.OK : denyStatus

/**
 * These rules determine whether a user can click through from the property overview to see further
 * property details for a prisoner including the property list, transfers and property history.
 */
export const readPropertyDetailsConditions: Partial<PrisonerPermissionConditions> = {
  // If the prisoner is in a prison that is not in the user's caseload,
  // the user is not permitted to view further property details.
  ifPrisonNotInCaseload: () => PermissionCheckStatus.NOT_IN_CASELOAD,

  // If the prisoner is released, transferring or a restricted patient, the user must have the
  // Inactive Bookings (Release Prisoner Viewing) role to view property details.
  ifReleasedPrisoner: inactiveBookingsRoleRequired(PermissionCheckStatus.PRISONER_IS_RELEASED),
  ifTransferringPrisoner: inactiveBookingsRoleRequired(PermissionCheckStatus.PRISONER_IS_TRANSFERRING),
  ifRestrictedPatient: inactiveBookingsRoleRequired(PermissionCheckStatus.RESTRICTED_PATIENT),
}

export const readPropertyDetailsCheck = matchBaseCheckAnd(readPropertyDetailsConditions)
