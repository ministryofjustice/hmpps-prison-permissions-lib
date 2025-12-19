import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { Role } from '../../../../../../../types/internal/user/Role'
import {
  isInUsersCaseLoad,
  isTransferring,
  logDeniedPermissionCheck,
  userHasRole,
} from '../../../../../utils/PermissionUtils'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'
import { PrisonerSpecificRisksPermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerSpecificRisks/PrisonerSpecificRisksPermissions'

const permission = PrisonerSpecificRisksPermission.read_csra_assessment_history

export default function csraAssessmentHistoryReadCheck(request: PermissionsCheckContext) {
  const { user, prisoner } = request

  const baseCheckPassed = request.baseCheckStatus === PermissionStatus.OK
  const inUsersCaseLoad = isInUsersCaseLoad(prisoner.prisonId, user)

  const check =
    baseCheckPassed && (inUsersCaseLoad || (isTransferring(prisoner) && userHasRole(Role.GlobalSearch, user)))

  if (!check)
    logDeniedPermissionCheck(
      permission,
      request,
      isTransferring(prisoner) ? PermissionStatus.PRISONER_IS_TRANSFERRING : PermissionStatus.NOT_IN_CASELOAD,
    )

  return check
}
