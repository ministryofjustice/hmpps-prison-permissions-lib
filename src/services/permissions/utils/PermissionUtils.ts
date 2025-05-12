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

export const isActiveCaseLoad = (prisonId: string | undefined, user: HmppsUser) =>
  user.authSource === 'nomis' && user.activeCaseLoadId === prisonId

export function isInUsersCaseLoad(prisonId: string | undefined, user: HmppsUser): boolean {
  return user.authSource === 'nomis' && user.caseLoads?.some(caseLoad => caseLoad.caseLoadId === prisonId)
}

export function isReleasedOrTransferring(prisonId: string | undefined): boolean {
  return ['OUT', 'TRN'].includes(prisonId as string)
}

export function userHasSomeRolesFrom(rolesToCheck: Role[], user: HmppsUser): boolean {
  return (
    rolesToCheck.length === 0 ||
    rolesToCheck.map(normaliseRoleText).some(role => user.userRoles.map(normaliseRoleText).includes(role))
  )
}

export function userHasAllRoles(rolesToCheck: Role[], user: HmppsUser): boolean {
  return rolesToCheck.map(normaliseRoleText).every(role => user.userRoles.map(normaliseRoleText).includes(role))
}

export const userHasRole = (roleToCheck: Role, user: HmppsUser): boolean => {
  return userHasAllRoles([roleToCheck], user)
}

const normaliseRoleText = (role: string): string => role.replace(/ROLE_/, '')
