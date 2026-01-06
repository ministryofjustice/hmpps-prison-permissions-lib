import PrisonerPermissionsContext from '../../../types/internal/permissions/PrisonerPermissionsContext'
import { PrisonerPermission } from '../../../types/public/permissions/prisoner/PrisonerPermissions'
import { getPermissionStatus, PrisonerPermissionConditions } from '../PrisonerPermissionConditions'
import { PermissionCheckStatus } from '../../../types/internal/permissions/PermissionCheckStatus'
import { baseCheckConditions } from '../checks/baseCheck/status/BaseCheckStatus'
import { logDeniedPermissionCheck } from './PermissionUtils'

export const matchBaseCheckAnd =
  (additionalConditions: Partial<PrisonerPermissionConditions>) =>
  (permission: PrisonerPermission, context: PrisonerPermissionsContext) => {
    const { user, prisoner, baseCheckStatus } = context
    const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK

    const permissionStatus = getPermissionStatus(user, prisoner, {
      ...baseCheckConditions,
      ...additionalConditions,
    })

    const permissionCheckPassed = baseCheckPassed && permissionStatus === PermissionCheckStatus.OK

    if (!permissionCheckPassed) logDeniedPermissionCheck(permission, context, permissionStatus)

    return permissionCheckPassed
  }

export const checkWith =
  (context: PrisonerPermissionsContext) =>
  <P extends keyof T, T>(
    permission: P,
    check: (permission: PrisonerPermission, context: PrisonerPermissionsContext) => boolean,
  ): Pick<T, P> => {
    return { [permission]: check(permission as PrisonerPermission, context) } as Pick<T, P>
  }
