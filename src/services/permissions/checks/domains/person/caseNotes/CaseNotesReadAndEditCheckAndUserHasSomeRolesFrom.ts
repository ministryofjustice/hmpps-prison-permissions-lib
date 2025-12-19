import { CaseNotesPermission } from '../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { PermissionStatus } from '../../../../../../types/internal/permissions/PermissionStatus'
import PermissionsCheckContext from '../../../PermissionsCheckContext'
import { logDeniedPermissionCheck, userHasSomeRolesFrom } from '../../../../utils/PermissionUtils'
import { Role } from '../../../../../../types/internal/user/Role'
import caseNotesReadAndEditCheck from './CaseNotesReadAndEditCheck'

export default function caseNotesReadAndEditCheckAndUserHasRolesFrom(
  roles: Role[],
  permission: CaseNotesPermission,
  request: PermissionsCheckContext,
) {
  const { user } = request

  const baseCaseNotesCheckPassed = caseNotesReadAndEditCheck(permission, request)

  const check = baseCaseNotesCheckPassed && userHasSomeRolesFrom(roles, user)

  if (!check) logDeniedPermissionCheck(permission, request, PermissionStatus.ROLE_NOT_PRESENT)

  return check
}
