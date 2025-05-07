import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { CaseNotesPermission } from '../../../../../../../types/permissions/domains/person/caseNotes/CaseNotesPermissions'
import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/user/Role'

const permission = CaseNotesPermission.read_sensitive

export default function sensitiveCaseNotesReadCheck(request: PermissionsCheckRequest) {
  return baseCheckAndUserHasSomeRolesFrom(
    [Role.PomUser, Role.ViewSensitiveCaseNotes, Role.AddSensitiveCaseNotes],
    permission,
    request,
  )
}
