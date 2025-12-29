import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

const locationDetailsAndHistoryReadCheck = matchBaseCheckAnd({
  // Global search access is not allowed:
  ifPrisonNotInCaseload: () => PermissionCheckStatus.NOT_IN_CASELOAD,
})

export default locationDetailsAndHistoryReadCheck
