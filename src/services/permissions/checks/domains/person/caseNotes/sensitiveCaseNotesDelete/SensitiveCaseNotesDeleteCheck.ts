import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { CaseNotesPermission } from '../../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { Role } from '../../../../../../../types/internal/user/Role'
import baseCheckAndUserHasRole from '../../../../sharedChecks/baseCheckAndUserHasRole/BaseCheckAndUserHasRole'

const permission = CaseNotesPermission.delete_sensitive

export default function sensitiveCaseNotesDeleteCheck(request: PermissionsCheckRequest) {
  return baseCheckAndUserHasRole(Role.DeleteSensitiveCaseNotes, permission, request)
}
