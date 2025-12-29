import { Role } from '../../../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'
import { caseNotesReadAndEditConditions } from '../CaseNotesReadAndEditCheck'

const sensitiveCaseNotesDeleteCheck = matchBaseCheckAnd({
  ...caseNotesReadAndEditConditions,
  atLeastOneRoleRequiredFrom: [Role.DeleteSensitiveCaseNotes],
})

export default sensitiveCaseNotesDeleteCheck
