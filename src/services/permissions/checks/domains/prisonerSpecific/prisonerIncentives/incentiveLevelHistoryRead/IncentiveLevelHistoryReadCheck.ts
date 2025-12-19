import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'
import { userHasSomeRolesFrom } from '../../../../../utils/PermissionUtils'
import { PrisonerIncentivesPermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerIncentives/PrisonerIncentivesPermissions'
import { Role } from '../../../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

const permission = PrisonerIncentivesPermission.read_incentive_level_history

const incentiveLevelHistoryReadCheck = (request: PermissionsCheckContext) =>
  matchBaseCheckAnd(request, permission, {
    ifTransferringPrisoner: (user, _) => {
      return userHasSomeRolesFrom([Role.GlobalSearch], user)
        ? PermissionStatus.OK
        : PermissionStatus.PRISONER_IS_TRANSFERRING
    },
    ifInPrisonOutsideCaseload: (_, __) => PermissionStatus.NOT_IN_CASELOAD,
  })

export default incentiveLevelHistoryReadCheck
