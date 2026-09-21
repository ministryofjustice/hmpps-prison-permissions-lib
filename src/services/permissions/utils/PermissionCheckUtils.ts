import PrisonerPermissionsContext from '../../../types/internal/permissions/PrisonerPermissionsContext'
import { PrisonerPermission } from '../../../types/public/permissions/prisoner/PrisonerPermissions'
import { getPermissionStatus, PrisonerPermissionConditions } from '../PrisonerPermissionConditions'
import { PermissionCheckStatus } from '../../../types/internal/permissions/PermissionCheckStatus'
import { baseCheckConditions } from '../checks/baseCheck/status/BaseCheckStatus'
import { logDeniedPermissionCheck } from './PermissionUtils'

export const matchBaseCheckAnd =
  (
    additionalConditions: Partial<PrisonerPermissionConditions>,
    baseCheckConditionsOverride?: PrisonerPermissionConditions,
  ) =>
  (permission: PrisonerPermission, context: PrisonerPermissionsContext) => {
    const { user, prisoner, baseCheckStatus: defaultBaseCheckStatus, readOnly } = context

    let baseCheckStatus: PermissionCheckStatus
    if (baseCheckConditionsOverride) {
      baseCheckStatus = getPermissionStatus(user, prisoner, baseCheckConditionsOverride)
    } else {
      baseCheckStatus = defaultBaseCheckStatus
    }

    const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK

    const readOnlyCheckPassed = readOnly ? permission.endsWith(':read') : true

    const permissionStatus = readOnlyCheckPassed
      ? getPermissionStatus(user, prisoner, {
          ...(baseCheckConditionsOverride ?? baseCheckConditions),
          ...additionalConditions,
        })
      : PermissionCheckStatus.READ_ONLY

    const permissionCheckPassed = baseCheckPassed && permissionStatus === PermissionCheckStatus.OK

    if (!permissionCheckPassed) logDeniedPermissionCheck(permission, context, permissionStatus, baseCheckStatus)

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
