import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { CaseNotesPermission } from '../../../../../../../types/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { Role } from '../../../../../../../types/user/Role'
import baseCheckAndUserHasRole from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndUserHasRole'

const permission = CaseNotesPermission.delete_sensitive

export default function sensitiveCaseNotesDeleteCheck(request: PermissionsCheckRequest) {
  return baseCheckAndUserHasRole(Role.DeleteSensitiveCaseNotes, permission, request)
}
