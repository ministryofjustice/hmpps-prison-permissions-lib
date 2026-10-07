import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { userHasRole } from '../../../../../utils/PermissionUtils'
import { HmppsUser } from '../../../../../../../types/internal/user/HmppsUser'
import { PrisonerPermissionConditions } from '../../../../../PrisonerPermissionConditions'

const inactiveBookingsRoleRequired =
  (denyStatus: PermissionCheckStatus) =>
  (user: HmppsUser): PermissionCheckStatus =>
    userHasRole(Role.InactiveBookings, user) ? PermissionCheckStatus.OK : denyStatus

/**
 * To see a basic property overview for a released/transferring/restricted patient prisoner
 * the user must have the "Inactive Bookings (Released Prisoner Viewing)" role:
 */
export const readPropertyOverviewConditions: Partial<PrisonerPermissionConditions> = {
  ifReleasedPrisoner: inactiveBookingsRoleRequired(PermissionCheckStatus.PRISONER_IS_RELEASED),
  ifTransferringPrisoner: inactiveBookingsRoleRequired(PermissionCheckStatus.PRISONER_IS_TRANSFERRING),
  ifRestrictedPatient: inactiveBookingsRoleRequired(PermissionCheckStatus.RESTRICTED_PATIENT),
}

export const readPropertyOverviewCheck = matchBaseCheckAnd(readPropertyOverviewConditions)
