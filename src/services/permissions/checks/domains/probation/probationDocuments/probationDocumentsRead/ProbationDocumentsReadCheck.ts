import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { Role } from '../../../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

const probationDocumentsReadCheck = matchBaseCheckAnd({
  atLeastOneRoleRequiredFrom: [Role.PomUser, Role.ViewProbationDocuments],

  // Global search access is not allowed:
  ifPrisonNotInCaseload: () => PermissionCheckStatus.NOT_IN_CASELOAD,
})

export default probationDocumentsReadCheck
