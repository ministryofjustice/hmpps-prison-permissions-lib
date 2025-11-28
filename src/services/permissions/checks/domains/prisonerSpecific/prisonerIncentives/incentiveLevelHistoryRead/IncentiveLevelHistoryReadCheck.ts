import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import {
  isInUsersCaseLoad,
  isReleased,
  isTransferring,
  logDeniedPermissionCheck,
  userHasSomeRolesFrom,
} from '../../../../../utils/PermissionUtils'
import { PrisonerIncentivesPermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerIncentives/PrisonerIncentivesPermissions'
import restrictedPatientStatus from '../../../../baseCheck/status/RestrictedPatientStatus'
import releasedPrisonerStatus from '../../../../baseCheck/status/ReleasedPrisonerStatus'
import { Role } from '../../../../../../../types/internal/user/Role'

const permission = PrisonerIncentivesPermission.read_incentive_level_history

export default function incentiveLevelHistoryReadCheck(request: PermissionsCheckRequest) {
  const baseCheckPassed = request.baseCheckStatus === PermissionCheckStatus.OK

  const incentiveLevelHistoryAccess = checkIncentiveLevelHistoryAccess(request)
  const incentiveLevelHistoryCheckPassed = incentiveLevelHistoryAccess === PermissionCheckStatus.OK

  const check = baseCheckPassed && incentiveLevelHistoryCheckPassed

  if (!check) logDeniedPermissionCheck(permission, request, incentiveLevelHistoryAccess)

  return check
}

function checkIncentiveLevelHistoryAccess(request: PermissionsCheckRequest): PermissionCheckStatus {
  const { user, prisoner } = request

  // Restricted patients follows the base check rules:
  if (prisoner.restrictedPatient) return restrictedPatientStatus(user, prisoner)

  // Released prisoners follows the base check rules:
  if (isReleased(prisoner)) return releasedPrisonerStatus(user)

  // Transferring prisoner incentive history can only be accessed by users with the Global Search role:
  if (isTransferring(prisoner))
    return userHasSomeRolesFrom([Role.GlobalSearch], user)
      ? PermissionCheckStatus.OK
      : PermissionCheckStatus.PRISONER_IS_TRANSFERRING

  // Global search is not sufficient for incentive level history access:
  return isInUsersCaseLoad(prisoner.prisonId, user) ? PermissionCheckStatus.OK : PermissionCheckStatus.NOT_IN_CASELOAD
}
