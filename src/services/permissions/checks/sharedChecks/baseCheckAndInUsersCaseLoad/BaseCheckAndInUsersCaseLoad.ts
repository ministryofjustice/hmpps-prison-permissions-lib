import { PrisonerPermission } from '../../../../../types/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../types/permissions/PermissionCheckStatus'
import { isInUsersCaseLoad, logDeniedPermissionCheck } from '../../../utils/PermissionUtils'

export default function baseCheckAndInUsersCaseLoad(permission: PrisonerPermission, request: PermissionsCheckRequest) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const check = baseCheckPassed && isInUsersCaseLoad(prisoner.prisonId, user)

  if (!check) logDeniedPermissionCheck(permission, request, PermissionCheckStatus.NOT_IN_CASELOAD)

  return check
}
