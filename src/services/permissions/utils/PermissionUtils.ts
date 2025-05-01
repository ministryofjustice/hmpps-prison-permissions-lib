import { HmppsUser } from '../../../types/user/HmppsUser'
import { PrisonerPermission } from '../../../types/permissions/prisoner/PrisonerPermissions'
import { Role } from '../../../types/user/Role'
import { PermissionCheckStatus } from '../../../types/permissions/PermissionCheckStatus'
import PermissionsCheckRequest from '../checks/PermissionsCheckRequest'

export function isRequiredPermission(
  permission: PrisonerPermission,
  requiredPermissions: PrisonerPermission[],
): boolean {
  return requiredPermissions.includes(permission)
}

export function logDeniedPermissionCheck(
  permission: PrisonerPermission,
  request: PermissionsCheckRequest,
  status: PermissionCheckStatus,
) {
  const { user, prisoner, baseCheckStatus, requestDependentOn, permissionsLogger } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK

  if (isRequiredPermission(permission, requestDependentOn)) {
    permissionsLogger.logPermissionCheckStatus(user, prisoner, permission, baseCheckPassed ? status : baseCheckStatus)
  }
}

export function isInUsersCaseLoad(prisonId: string | undefined, user: HmppsUser): boolean {
  return user.authSource === 'nomis' && user.caseLoads?.some(caseLoad => caseLoad.caseLoadId === prisonId)
}

export function userHasSomeRolesFrom(rolesToCheck: Role[], userRoles: Role[]): boolean {
  const normaliseRoleText = (role: string): string => role.replace(/ROLE_/, '')
  return rolesToCheck.map(normaliseRoleText).some(role => userRoles.map(normaliseRoleText).includes(role))
}

export const userHasRole = (roleToCheck: Role, userRoles: Role[]): boolean => {
  return userHasSomeRolesFrom([roleToCheck], userRoles)
}
