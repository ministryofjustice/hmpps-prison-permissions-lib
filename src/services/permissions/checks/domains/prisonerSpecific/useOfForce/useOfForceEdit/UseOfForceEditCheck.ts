import PrisonerPermissionsContext from '../../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { userHasRole } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import { PrisonerPermissionConditions } from '../../../../../PrisonerPermissionConditions'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

const requiresInactiveBookingRole = (context: PrisonerPermissionsContext) => () =>
  userHasRole(Role.InactiveBookings, context.user) ? PermissionCheckStatus.OK : PermissionCheckStatus.NOT_IN_CASELOAD

export default function useOfForceEditCheck(permission: PrisonerPermission, context: PrisonerPermissionsContext) {
  const conditions: PrisonerPermissionConditions = {
    ifRestrictedPatient: () => PermissionCheckStatus.NOT_IN_CASELOAD,
    ifReleasedPrisoner: requiresInactiveBookingRole(context),
    ifTransferringPrisoner: requiresInactiveBookingRole(context),
    ifPrisonNotInCaseload: () => PermissionCheckStatus.NOT_IN_CASELOAD,
    ifPrisonInCaseload: () => PermissionCheckStatus.OK,
  }

  return matchBaseCheckAnd(permission, context, conditions)
}
