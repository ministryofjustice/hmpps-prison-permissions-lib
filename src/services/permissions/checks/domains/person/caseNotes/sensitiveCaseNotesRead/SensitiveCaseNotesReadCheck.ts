import PrisonerPermissionsContext from '../../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { Role } from '../../../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'
import { caseNotesReadAndEditConditions } from '../CaseNotesReadAndEditCheck'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'

export default function sensitiveCaseNotesReadCheck(
  permission: PrisonerPermission,
  context: PrisonerPermissionsContext,
) {
  return matchBaseCheckAnd(permission, context, {
    ...caseNotesReadAndEditConditions,
    atLeastOneRoleRequiredFrom: [Role.PomUser, Role.ViewSensitiveCaseNotes, Role.AddSensitiveCaseNotes],
  })
}
