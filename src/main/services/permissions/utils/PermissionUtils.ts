import {
  checkPrisonerAccess,
  PrisonerPermission,
  PrisonerPermissions,
} from '../../../types/permissions/prisoner/PrisonerPermissions'
import { HmppsUser } from '../../../types/user/HmppsUser'

export async function getIfReadPermitted<T>(
  permission: PrisonerPermission,
  permissions: PrisonerPermissions,
  getter: () => T | Promise<T>,
): Promise<T> {
  if (checkPrisonerAccess(permission, permissions)) return getter()
  return null as T
}

export function isRequiredPermission(
  permission: PrisonerPermission,
  requiredPermissions: PrisonerPermission[],
): boolean {
  return requiredPermissions.includes(permission)
}

export const isActiveCaseLoad = (prisonId: string, user: HmppsUser) =>
  user.authSource === 'nomis' && user.activeCaseLoadId === prisonId

export const includesActiveCaseLoad = (prisons: string[], user: HmppsUser) =>
  user.authSource === 'nomis' && prisons.includes(user.activeCaseLoadId)

export const isInUsersCaseLoad = (prisonId: string | undefined, user: HmppsUser): boolean =>
  user.authSource === 'nomis' && user.caseLoads.some(caseLoad => caseLoad.caseLoadId === prisonId)

/**
 * Whether any of the roles exist for the given user allowing for conditional role based access on any number of roles
 *
 * @param rolesToCheck
 * @param userRoles
 */
export const userHasRoles = (rolesToCheck: string[], userRoles: string[]): boolean => {
  const normaliseRoleText = (role: string): string => role.replace(/ROLE_/, '')
  return rolesToCheck.map(normaliseRoleText).some(role => userRoles.map(normaliseRoleText).includes(role))
}

/**
 * Whether all of the roles exist for the given user allowing for conditional role based access on any number of roles
 *
 * @param rolesToCheck
 * @param userRoles
 */
export const userHasAllRoles = (rolesToCheck: string[], userRoles: string[]): boolean => {
  return rolesToCheck.every(role => userRoles.includes(role))
}
