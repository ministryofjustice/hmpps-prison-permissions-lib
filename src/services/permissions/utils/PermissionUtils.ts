import { HmppsUser } from '../../../types/user/HmppsUser'
import { PrisonerPermission } from '../../../types/permissions/prisoner/PrisonerPermissions'

export function isRequiredPermission(
  permission: PrisonerPermission,
  requiredPermissions: PrisonerPermission[],
): boolean {
  return requiredPermissions.includes(permission)
}

export const isInUsersCaseLoad = (prisonId: string | undefined, user: HmppsUser): boolean =>
  user.authSource === 'nomis' && user.caseLoads?.some(caseLoad => caseLoad.caseLoadId === prisonId)

export const userHasRoles = (rolesToCheck: string[], userRoles: string[]): boolean => {
  const normaliseRoleText = (role: string): string => role.replace(/ROLE_/, '')
  return rolesToCheck.map(normaliseRoleText).some(role => userRoles.map(normaliseRoleText).includes(role))
}
