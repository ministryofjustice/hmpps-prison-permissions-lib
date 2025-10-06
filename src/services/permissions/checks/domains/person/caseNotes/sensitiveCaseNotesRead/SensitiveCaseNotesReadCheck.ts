import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { CaseNotesPermission } from '../../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { Role } from '../../../../../../../types/internal/user/Role'
import caseNotesReadAndEditCheckAndUserHasRolesFrom from '../CaseNotesReadAndEditCheckAndUserHasSomeRolesFrom'

const permission = CaseNotesPermission.read_sensitive

export default function sensitiveCaseNotesReadCheck(request: PermissionsCheckRequest) {
  return caseNotesReadAndEditCheckAndUserHasRolesFrom(
    [Role.PomUser, Role.ViewSensitiveCaseNotes, Role.AddSensitiveCaseNotes],
    permission,
    request,
  )
}
