import { Role } from '../../../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'
import { caseNotesReadAndEditConditions } from '../CaseNotesReadAndEditCheck'

const sensitiveCaseNotesReadCheck = matchBaseCheckAnd({
  ...caseNotesReadAndEditConditions,
  atLeastOneRoleRequiredFrom: [Role.PomUser, Role.ViewSensitiveCaseNotes, Role.AddSensitiveCaseNotes],
})

export default sensitiveCaseNotesReadCheck
