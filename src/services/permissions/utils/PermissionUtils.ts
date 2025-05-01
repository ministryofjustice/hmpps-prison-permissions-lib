import { HmppsUser } from '../../../types/user/HmppsUser'
import { PrisonerPermission } from '../../../types/permissions/prisoner/PrisonerPermissions'
import { Role } from '../../../types/user/Role'

export function isRequiredPermission(
  permission: PrisonerPermission,
  requiredPermissions: PrisonerPermission[],
): boolean {
  return requiredPermissions.includes(permission)
}

export const isInUsersCaseLoad = (prisonId: string | undefined, user: HmppsUser): boolean =>
  user.authSource === 'nomis' && user.caseLoads?.some(caseLoad => caseLoad.caseLoadId === prisonId)

export const userHasSomeRolesFrom = (rolesToCheck: Role[], userRoles: Role[]): boolean => {
  const normaliseRoleText = (role: string): string => role.replace(/ROLE_/, '')
  return rolesToCheck.map(normaliseRoleText).some(role => userRoles.map(normaliseRoleText).includes(role))
}

export const userHasRole = (roleToCheck: Role, userRoles: Role[]): boolean => {
  return userHasSomeRolesFrom([roleToCheck], userRoles)
}
