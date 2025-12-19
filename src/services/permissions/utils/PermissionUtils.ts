import { HmppsUser } from '../../../types/internal/user/HmppsUser'
import { PrisonerPermission } from '../../../types/public/permissions/prisoner/PrisonerPermissions'
import { Role } from '../../../types/internal/user/Role'
import { PermissionStatus } from '../../../types/internal/permissions/PermissionStatus'
import PermissionsCheckContext from '../checks/PermissionsCheckContext'
import Prisoner from '../../../data/hmppsPrisonerSearch/interfaces/Prisoner'

export function isRequiredPermission(
  permission: PrisonerPermission,
  requiredPermissions: PrisonerPermission[],
): boolean {
  return requiredPermissions.includes(permission)
}

export function logDeniedPermissionCheck(
  permission: PrisonerPermission,
  request: PermissionsCheckContext,
  status: PermissionStatus,
) {
  const { user, prisoner, baseCheckStatus, requestDependentOn, permissionsLogger } = request

  const baseCheckPassed = baseCheckStatus === PermissionStatus.OK

  if (isRequiredPermission(permission, requestDependentOn)) {
    permissionsLogger.logpermissionStatus(user, prisoner, permission, baseCheckPassed ? status : baseCheckStatus)
  }
}

export const isActiveCaseLoad = (prisonId: string | undefined, user: HmppsUser) =>
  user.authSource === 'nomis' && user.activeCaseLoadId === prisonId

export function isInUsersCaseLoad(prisonId: string | undefined, user: HmppsUser): boolean {
  return user.authSource === 'nomis' && user.caseLoads?.some(caseLoad => caseLoad.caseLoadId === prisonId)
}

export const isReleased = (prisoner: Prisoner): boolean => {
  return !!prisoner?.prisonId && ['OUT'].includes(prisoner.prisonId)
}

export const isTransferring = (prisoner: Prisoner): boolean => {
  return !!prisoner?.prisonId && ['TRN'].includes(prisoner.prisonId)
}

export function isReleasedOrTransferring(prisoner: Prisoner): boolean {
  return isReleased(prisoner) || isTransferring(prisoner)
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
