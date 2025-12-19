import { PrisonerPermission } from '../../../types/public/permissions/prisoner/PrisonerPermissions'
import { PermissionStatus } from '../../../types/internal/permissions/PermissionStatus'
import PermissionsCheckContext from '../checks/PermissionsCheckContext'
import { AdditionalPermissionRules, SituationalCheck } from '../checks/GetStatus'
import { logDeniedPermissionCheck } from './PermissionUtils'
import { getpermissionStatus } from '../checks/baseCheck/status/BaseCheckStatus'

export function followBaseCheckAnd(
  request: PermissionsCheckContext,
  permission: PrisonerPermission,
  additionalCheck: SituationalCheck,
) {
  const { user, prisoner, baseCheckStatus } = request
  const baseCheckPassed = baseCheckStatus === PermissionStatus.OK

  const permissionStatus = additionalCheck(user, prisoner)
  const permissionCheckPassed = baseCheckPassed && permissionStatus === PermissionStatus.OK

  if (!permissionCheckPassed) logDeniedPermissionCheck(permission, request, permissionStatus)

  return permissionCheckPassed
}

export function matchBaseCheckAnd(
  request: PermissionsCheckContext,
  permission: PrisonerPermission,
  permissionRules: Partial<AdditionalPermissionRules>,
) {
  const { user, prisoner, baseCheckStatus } = request
  const baseCheckPassed = baseCheckStatus === PermissionStatus.OK

  const permissionStatus = getpermissionStatus(user, prisoner, permissionRules)
  const permissionCheckPassed = baseCheckPassed && permissionStatus === PermissionStatus.OK

  if (!permissionCheckPassed) logDeniedPermissionCheck(permission, request, permissionStatus)

  return permissionCheckPassed
}
