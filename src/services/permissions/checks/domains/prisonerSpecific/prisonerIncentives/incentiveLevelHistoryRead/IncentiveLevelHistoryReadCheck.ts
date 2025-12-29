import PrisonerPermissionsContext from '../../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { userHasSomeRolesFrom } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

export default function incentiveLevelHistoryReadCheck(
  permission: PrisonerPermission,
  context: PrisonerPermissionsContext,
) {
  return matchBaseCheckAnd(permission, context, {
    // Transferring prisoner incentive history can only be accessed by users with the Global Search role:
    ifTransferringPrisoner: user =>
      userHasSomeRolesFrom([Role.GlobalSearch], user)
        ? PermissionCheckStatus.OK
        : PermissionCheckStatus.PRISONER_IS_TRANSFERRING,

    // Global search is not sufficient for incentive level history access:
    ifPrisonNotInCaseload: () => PermissionCheckStatus.NOT_IN_CASELOAD,
  })
}
