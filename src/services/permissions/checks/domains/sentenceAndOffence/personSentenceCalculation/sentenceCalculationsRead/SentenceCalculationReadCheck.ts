import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { PersonSentenceCalculationPermission } from '../../../../../../../types/permissions/domains/sentenceAndOffence/PersonSentenceCalculationPermissions'
import { isRequiredPermission, userHasRoles } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/user/Role'
import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'

const permission = PersonSentenceCalculationPermission.read

export default function sentenceCalculationReadCheck(request: PermissionsCheckRequest) {
  const { user, prisoner, baseCheckStatus, requestDependentOn, permissionsLogger } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const check = baseCheckPassed && userHasRoles([Role.ReleaseDatesCalculator], user.userRoles)

  if (!check && isRequiredPermission(permission, requestDependentOn)) {
    const status = baseCheckPassed ? PermissionCheckStatus.ROLE_NOT_PRESENT : baseCheckStatus
    permissionsLogger.logPermissionCheckStatus(user, prisoner, permission, status)
  }

  return check
}
