import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { CaseNotesPermission } from '../../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { Role } from '../../../../../../../types/internal/user/Role'
import caseNotesReadAndEditCheckAndUserHasRolesFrom from '../CaseNotesReadAndEditCheckAndUserHasSomeRolesFrom'

const permission = CaseNotesPermission.edit_sensitive

export default function sensitiveCaseNotesEditCheck(request: PermissionsCheckContext) {
  return caseNotesReadAndEditCheckAndUserHasRolesFrom([Role.PomUser, Role.AddSensitiveCaseNotes], permission, request)
}
