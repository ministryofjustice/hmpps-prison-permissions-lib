import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { CaseNotesPermission } from '../../../../../../../types/permissions/domains/person/caseNotes/CaseNotesPermissions'
import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/user/Role'

const permission = CaseNotesPermission.edit_sensitive

export default function sensitiveCaseNotesEditCheck(request: PermissionsCheckRequest) {
  return baseCheckAndUserHasSomeRolesFrom([Role.PomUser, Role.AddSensitiveCaseNotes], permission, request)
}
