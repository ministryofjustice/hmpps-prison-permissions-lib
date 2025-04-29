import { PermissionCheckStatus } from '../../../../types/permissions/PermissionCheckStatus'
import { PrisonerBasePermission } from '../../../../types/permissions/prisoner/PrisonerPermissions'
import { isRequiredPermission } from '../../utils/PermissionUtils'
import PermissionsCheckRequest from '../PermissionsCheckRequest'

const permission = PrisonerBasePermission.read

export default function baseCheck(request: PermissionsCheckRequest) {
  const { user, prisoner, baseCheckStatus, requestDependentOn, permissionsLogger } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK

  if (!baseCheckPassed && isRequiredPermission(permission, requestDependentOn)) {
    permissionsLogger.logPermissionCheckStatus(user, prisoner, permission, baseCheckStatus)
  }

  return baseCheckPassed
}
