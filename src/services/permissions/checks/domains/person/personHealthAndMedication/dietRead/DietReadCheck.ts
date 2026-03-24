import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'
import { isInUsersCaseLoad } from '../../../../../utils/PermissionUtils'

const dietReadCheck = matchBaseCheckAnd({
  ifRestrictedPatient: (user, prisoner) =>
    isInUsersCaseLoad(prisoner.supportingPrisonId, user)
      ? PermissionCheckStatus.OK
      : PermissionCheckStatus.RESTRICTED_PATIENT,
  ifReleasedPrisoner: () => PermissionCheckStatus.PRISONER_IS_RELEASED,
  ifTransferringPrisoner: () => PermissionCheckStatus.PRISONER_IS_TRANSFERRING,
  ifPrisonNotInCaseload: () => PermissionCheckStatus.NOT_IN_CASELOAD,
})

export default dietReadCheck
