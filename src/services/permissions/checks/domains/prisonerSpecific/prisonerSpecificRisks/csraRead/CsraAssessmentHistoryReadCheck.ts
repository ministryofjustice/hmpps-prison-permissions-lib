import PrisonerPermissionsContext from '../../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { Role } from '../../../../../../../types/internal/user/Role'
import { userHasRole } from '../../../../../utils/PermissionUtils'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'
import { PrisonerPermissionConditions } from '../../../../../PrisonerPermissionConditions'

export default function csraAssessmentHistoryReadCheck(
  permission: PrisonerPermission,
  context: PrisonerPermissionsContext,
) {
  const conditions: PrisonerPermissionConditions = {
    ifRestrictedPatient: () => PermissionCheckStatus.NOT_IN_CASELOAD,
    ifReleasedPrisoner: () => PermissionCheckStatus.NOT_IN_CASELOAD,
    ifPrisonNotInCaseload: () => PermissionCheckStatus.NOT_IN_CASELOAD,

    // The Inactive Bookings role is NOT sufficient to access CSRA history for transferring prisoners:
    ifTransferringPrisoner: user =>
      userHasRole(Role.GlobalSearch, user) ? PermissionCheckStatus.OK : PermissionCheckStatus.PRISONER_IS_TRANSFERRING,

    ifPrisonInCaseload: () => PermissionCheckStatus.OK,
  }

  return matchBaseCheckAnd(permission, context, conditions)
}
