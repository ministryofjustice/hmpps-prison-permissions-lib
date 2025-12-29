import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { userHasSomeRolesFrom } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

const incentiveLevelHistoryReadCheck = matchBaseCheckAnd({
  // Transferring prisoner incentive history can only be accessed by users with the Global Search role:
  ifTransferringPrisoner: user =>
    userHasSomeRolesFrom([Role.GlobalSearch], user)
      ? PermissionCheckStatus.OK
      : PermissionCheckStatus.PRISONER_IS_TRANSFERRING,

  // Global search is not sufficient for incentive level history access:
  ifPrisonNotInCaseload: () => PermissionCheckStatus.NOT_IN_CASELOAD,
})

export default incentiveLevelHistoryReadCheck
