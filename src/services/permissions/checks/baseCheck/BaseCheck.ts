import { PermissionCheckStatus } from '../../../../types/internal/permissions/PermissionCheckStatus'
import { PrisonerPermission } from '../../../../types/public/permissions/prisoner/PrisonerPermissions'
import { isRequiredPermission } from '../../utils/PermissionUtils'
import PrisonerPermissionsContext from '../../../../types/internal/permissions/PrisonerPermissionsContext'

export default function baseCheck(permission: PrisonerPermission, context: PrisonerPermissionsContext) {
  const { user, prisoner, baseCheckStatus, requestDependentOn, permissionsLogger } = context

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK

  if (!baseCheckPassed && isRequiredPermission(permission, requestDependentOn)) {
    permissionsLogger.logPermissionCheckStatus(user, prisoner, permission, baseCheckStatus)
  }

  return baseCheckPassed
}
