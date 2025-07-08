import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'
import { isActiveCaseLoad, logDeniedPermissionCheck, userHasRole } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'

export default function prisonerProfileSensitiveEditCheck(
  permission: PrisonerPermission,
  request: PermissionsCheckRequest,
) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const inActiveCaseLoad = isActiveCaseLoad(prisoner.prisonId, user)
  const hasRole = userHasRole(Role.PrisonerProfileSensitiveEdit, user)

  const check = baseCheckPassed && inActiveCaseLoad && hasRole

  if (!check)
    logDeniedPermissionCheck(
      permission,
      request,
      inActiveCaseLoad ? PermissionCheckStatus.ROLE_NOT_PRESENT : PermissionCheckStatus.NOT_ACTIVE_CASELOAD,
    )

  return check
}
