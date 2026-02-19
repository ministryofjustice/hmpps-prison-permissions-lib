import { HmppsUser } from '../../../types/internal/user/HmppsUser'
import { PrisonerPermission, PrisonerPermissions } from '../../../types/public/permissions/prisoner/PrisonerPermissions'
import { Role } from '../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../types/internal/permissions/PermissionCheckStatus'
import PrisonerPermissionsContext from '../../../types/internal/permissions/PrisonerPermissionsContext'
import Prisoner from '../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { prisonerPermissionPaths } from '../../../types/public/permissions/prisoner/PrisonerPermissionPaths'
import { isGranted } from '../../../types/public/permissions/prisoner/PrisonerPermissionsUtils'

export function isRequiredPermission(
  permission: PrisonerPermission,
  requiredPermissions: PrisonerPermission[],
): boolean {
  return requiredPermissions.includes(permission)
}

export function logDeniedPermissionCheck(
  permission: PrisonerPermission,
  context: PrisonerPermissionsContext,
  status: PermissionCheckStatus,
) {
  const { user, prisoner, baseCheckStatus, requestDependentOn, permissionsLogger } = context

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

export const isReleased = (prisoner: Prisoner): boolean => {
  return !!prisoner?.prisonId && ['OUT'].includes(prisoner.prisonId)
}

export const isTransferring = (prisoner: Prisoner): boolean => {
  return !!prisoner?.prisonId && ['TRN'].includes(prisoner.prisonId)
}

export function isReleasedOrTransferring(prisoner: Prisoner): boolean {
  return isReleased(prisoner) || isTransferring(prisoner)
}

export const wasReleasedWithinThreeYears = (prisoner: Prisoner): boolean => {
  return (
    isReleased(prisoner) &&
    !!prisoner.releaseDate &&
    Date.parse(prisoner.releaseDate) > Date.now() - 3 * 365 * 24 * 60 * 60 * 1000
  )
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

export function setPrisonerPermission(
  permission: PrisonerPermission,
  permitted: boolean,
  permissions: PrisonerPermissions,
): PrisonerPermissions {
  const result = structuredClone(permissions)
  const keys = prisonerPermissionPaths[permission].split('.')
  const lastKey = keys.pop() as string
  // @ts-expect-error TS cannot determine object type
  // eslint-disable-next-line no-return-assign,no-param-reassign
  const lastObj = keys.reduce((obj: object, key: string) => (obj[key] = obj[key] || {}), result)

  // @ts-expect-error TS cannot determine object type
  lastObj[lastKey] = permitted
  return result
}

export function upgradePermissions(
  basePermissions: PrisonerPermissions,
  additionalPermissions: PrisonerPermissions,
): PrisonerPermissions {
  return Object.keys(prisonerPermissionPaths).reduce((updatedPermissions, key) => {
    const permission = key as PrisonerPermission
    if (!isGranted(permission, basePermissions)) {
      const additionalPermissionGranted = isGranted(permission, additionalPermissions)
      return setPrisonerPermission(permission, additionalPermissionGranted, updatedPermissions)
    }
    return updatedPermissions
  }, structuredClone(basePermissions))
}
