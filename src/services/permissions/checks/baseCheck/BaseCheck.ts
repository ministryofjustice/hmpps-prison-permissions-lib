import { PermissionCheckStatus } from '../../../../types/internal/permissions/PermissionCheckStatus'
import { PrisonerPermission } from '../../../../types/public/permissions/prisoner/PrisonerPermissions'
import { isRequiredPermission } from '../../utils/PermissionUtils'
import PermissionsCheckRequest from '../PermissionsCheckRequest'

export default function baseCheck(permission: PrisonerPermission, request: PermissionsCheckRequest) {
  const { user, prisoner, baseCheckStatus, requestDependentOn, permissionsLogger } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK

  if (!baseCheckPassed && isRequiredPermission(permission, requestDependentOn)) {
    permissionsLogger.logPermissionCheckStatus(user, prisoner, permission, baseCheckStatus)
  }

  return baseCheckPassed
}
