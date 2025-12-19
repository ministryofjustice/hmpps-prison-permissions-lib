import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { CaseNotesPermission } from '../../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { Role } from '../../../../../../../types/internal/user/Role'
import caseNotesReadAndEditCheckAndUserHasRolesFrom from '../CaseNotesReadAndEditCheckAndUserHasSomeRolesFrom'

const permission = CaseNotesPermission.delete_sensitive

export default function sensitiveCaseNotesDeleteCheck(request: PermissionsCheckContext) {
  return caseNotesReadAndEditCheckAndUserHasRolesFrom([Role.DeleteSensitiveCaseNotes], permission, request)
}
