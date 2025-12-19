import { PermissionStatus } from '../../../../types/internal/permissions/PermissionStatus'
import { PrisonerPermission } from '../../../../types/public/permissions/prisoner/PrisonerPermissions'
import { isRequiredPermission } from '../../utils/PermissionUtils'
import PermissionsCheckContext from '../PermissionsCheckContext'

export default function baseCheck(permission: PrisonerPermission, context: PermissionsCheckContext) {
  const { user, prisoner, baseCheckStatus, requestDependentOn, permissionsLogger } = context

  const baseCheckPassed = baseCheckStatus === PermissionStatus.OK

  if (!baseCheckPassed && isRequiredPermission(permission, requestDependentOn)) {
    permissionsLogger.logpermissionStatus(user, prisoner, permission, baseCheckStatus)
  }

  return baseCheckPassed
}
