import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckContext from '../../PermissionsCheckContext'
import { PermissionStatus } from '../../../../../types/internal/permissions/PermissionStatus'
import { isInUsersCaseLoad, logDeniedPermissionCheck } from '../../../utils/PermissionUtils'

export default function inUsersCaseLoad(permission: PrisonerPermission, request: PermissionsCheckContext) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionStatus.OK
  const check = baseCheckPassed && isInUsersCaseLoad(prisoner.prisonId, user)

  if (!check) logDeniedPermissionCheck(permission, request, PermissionStatus.NOT_IN_CASELOAD)

  return check
}
