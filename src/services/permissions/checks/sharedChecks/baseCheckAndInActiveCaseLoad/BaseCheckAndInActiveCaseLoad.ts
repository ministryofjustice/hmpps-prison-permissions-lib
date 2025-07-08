import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'
import { isActiveCaseLoad, logDeniedPermissionCheck } from '../../../utils/PermissionUtils'

export default function baseCheckAndInActiveCaseLoad(permission: PrisonerPermission, request: PermissionsCheckRequest) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const check = baseCheckPassed && isActiveCaseLoad(prisoner.prisonId, user)

  if (!check) logDeniedPermissionCheck(permission, request, PermissionCheckStatus.NOT_ACTIVE_CASELOAD)

  return check
}
