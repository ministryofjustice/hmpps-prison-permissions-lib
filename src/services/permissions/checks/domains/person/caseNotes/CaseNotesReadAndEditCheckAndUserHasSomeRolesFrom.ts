import { CaseNotesPermission } from '../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { PermissionCheckStatus } from '../../../../../../types/internal/permissions/PermissionCheckStatus'
import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import { logDeniedPermissionCheck, userHasSomeRolesFrom } from '../../../../utils/PermissionUtils'
import { Role } from '../../../../../../types/internal/user/Role'
import caseNotesReadAndEditCheck from './CaseNotesReadAndEditCheck'

export default function caseNotesReadAndEditCheckAndUserHasRolesFrom(
  roles: Role[],
  permission: CaseNotesPermission,
  request: PermissionsCheckRequest,
) {
  const { user } = request

  const baseCaseNotesCheckPassed = caseNotesReadAndEditCheck(permission, request)

  const check = baseCaseNotesCheckPassed && userHasSomeRolesFrom(roles, user)

  if (!check) logDeniedPermissionCheck(permission, request, PermissionCheckStatus.ROLE_NOT_PRESENT)

  return check
}
