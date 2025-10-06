import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { CaseNotesPermission } from '../../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { Role } from '../../../../../../../types/internal/user/Role'
import caseNotesReadAndEditCheckAndUserHasRolesFrom from '../CaseNotesReadAndEditCheckAndUserHasSomeRolesFrom'

const permission = CaseNotesPermission.edit_sensitive

export default function sensitiveCaseNotesEditCheck(request: PermissionsCheckRequest) {
  return caseNotesReadAndEditCheckAndUserHasRolesFrom([Role.PomUser, Role.AddSensitiveCaseNotes], permission, request)
}
