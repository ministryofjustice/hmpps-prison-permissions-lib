import { Role } from '../../../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'
import { caseNotesReadAndEditConditions } from '../CaseNotesReadAndEditCheck'

const sensitiveCaseNotesEditCheck = matchBaseCheckAnd({
  ...caseNotesReadAndEditConditions,
  atLeastOneRoleRequiredFrom: [Role.PomUser, Role.AddSensitiveCaseNotes],
})

export default sensitiveCaseNotesEditCheck
