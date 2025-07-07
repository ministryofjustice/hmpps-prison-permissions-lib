import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'
import { isInUsersCaseLoad, logDeniedPermissionCheck, userHasRole } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'

export default function prisonerProfileSensitiveEditCheck(
  permission: PrisonerPermission,
  request: PermissionsCheckRequest,
) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const inUsersCaseLoad = isInUsersCaseLoad(prisoner.prisonId, user)
  const hasRole = userHasRole(Role.PrisonerProfileSensitiveEdit, user)

  const check = baseCheckPassed && inUsersCaseLoad && hasRole

  if (!check)
    logDeniedPermissionCheck(
      permission,
      request,
      inUsersCaseLoad ? PermissionCheckStatus.ROLE_NOT_PRESENT : PermissionCheckStatus.NOT_IN_CASELOAD,
    )

  return check
}
