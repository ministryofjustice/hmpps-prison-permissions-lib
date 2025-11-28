import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { Role } from '../../../../../../../types/internal/user/Role'
import {
  isInUsersCaseLoad,
  isTransferring,
  logDeniedPermissionCheck,
  userHasRole,
} from '../../../../../utils/PermissionUtils'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { PrisonerSpecificRisksPermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerSpecificRisks/PrisonerSpecificRisksPermissions'

const permission = PrisonerSpecificRisksPermission.read_csra_assessment_history

export default function csraAssessmentHistoryReadCheck(request: PermissionsCheckRequest) {
  const { user, prisoner } = request

  const baseCheckPassed = request.baseCheckStatus === PermissionCheckStatus.OK
  const inUsersCaseLoad = isInUsersCaseLoad(prisoner.prisonId, user)

  const check =
    baseCheckPassed && (inUsersCaseLoad || (isTransferring(prisoner) && userHasRole(Role.GlobalSearch, user)))

  if (!check)
    logDeniedPermissionCheck(
      permission,
      request,
      isTransferring(prisoner) ? PermissionCheckStatus.PRISONER_IS_TRANSFERRING : PermissionCheckStatus.NOT_IN_CASELOAD,
    )

  return check
}
