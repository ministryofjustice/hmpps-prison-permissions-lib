import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { CaseNotesPermission } from '../../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/internal/user/Role'

const permission = CaseNotesPermission.edit_sensitive

export default function sensitiveCaseNotesEditCheck(request: PermissionsCheckRequest) {
  return baseCheckAndUserHasSomeRolesFrom([Role.PomUser, Role.AddSensitiveCaseNotes], permission, request)
}
