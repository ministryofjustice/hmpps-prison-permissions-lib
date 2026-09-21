import { daysToMilliseconds } from '../../../../utils/DateUtils'
import { matchBaseCheckAnd } from '../../../../utils/PermissionCheckUtils'
import { checkTimeBasedAccessPostTransfer } from '../../../../utils/PermissionUtils'
import { Role } from '../../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../../types/internal/permissions/PermissionCheckStatus'

const xrbsAccessPeriodPostTransferInMs = daysToMilliseconds(31)

const xrbsReadAndEditCheck = matchBaseCheckAnd({
  allRolesRequired: [Role.Prison, Role.DpsApplicationDeveloper], // TODO: remove DpsApplicationDeveloper

  ifPrisonNotInCaseload: (user, prisoner) => {
    // Scans for prisoners outside the user’s caseload are only accessible
    // if the prisoner was previously in one of the users caseloads in the last 31 days:
    return checkTimeBasedAccessPostTransfer(user, prisoner, xrbsAccessPeriodPostTransferInMs)
      ? PermissionCheckStatus.OK
      : PermissionCheckStatus.NOT_PERMITTED
  },
})

export default xrbsReadAndEditCheck
