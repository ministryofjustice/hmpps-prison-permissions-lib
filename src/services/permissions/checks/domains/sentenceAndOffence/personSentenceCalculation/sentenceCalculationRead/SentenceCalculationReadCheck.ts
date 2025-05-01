import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { PersonSentenceCalculationPermission } from '../../../../../../../types/permissions/domains/sentenceAndOffence/PersonSentenceCalculationPermissions'
import { logDeniedPermissionCheck, userHasRole } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/user/Role'
import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'

const permission = PersonSentenceCalculationPermission.read

export default function sentenceCalculationReadCheck(request: PermissionsCheckRequest) {
  const { user, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const check = baseCheckPassed && userHasRole(Role.ReleaseDatesCalculator, user.userRoles)

  if (!check) logDeniedPermissionCheck(permission, request, PermissionCheckStatus.ROLE_NOT_PRESENT)

  return check
}
