import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { Role } from '../../../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

const moveCellCheck = matchBaseCheckAnd({
  atLeastOneRoleRequiredFrom: [Role.CellMove],

  // Global search access is not allowed:
  ifPrisonNotInCaseload: () => PermissionCheckStatus.NOT_IN_CASELOAD,
})

export default moveCellCheck
