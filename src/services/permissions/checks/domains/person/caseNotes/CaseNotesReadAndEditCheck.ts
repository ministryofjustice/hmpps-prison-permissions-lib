import { PermissionCheckStatus } from '../../../../../../types/internal/permissions/PermissionCheckStatus'
import { isInUsersCaseLoad, userHasAllRoles, userHasRole } from '../../../../utils/PermissionUtils'
import { Role } from '../../../../../../types/internal/user/Role'
import { HmppsUser } from '../../../../../../types/internal/user/HmppsUser'
import Prisoner from '../../../../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { daysToMilliseconds, isDateWithinBounds } from '../../../../utils/DateUtils'
import { matchBaseCheckAnd } from '../../../../utils/PermissionCheckUtils'
import { PrisonerPermissionConditions } from '../../../../PrisonerPermissionConditions'

const caseNotesAccessPeriodPostTransferInMs = daysToMilliseconds(90)

export const caseNotesReadAndEditConditions: Partial<PrisonerPermissionConditions> = {
  ifTransferringPrisoner: user => {
    return userHasRole(Role.InactiveBookings, user)
      ? PermissionCheckStatus.OK
      : PermissionCheckStatus.PRISONER_IS_TRANSFERRING
  },

  ifPrisonNotInCaseload: (user, prisoner) => {
    if (!userHasAllRoles([Role.GlobalSearch, Role.PomUser], user)) return PermissionCheckStatus.ROLE_NOT_PRESENT

    // Case notes for prisoners outside the user's caseload are only accessible with both Global Search and POM roles
    // if the prisoner was previously in one of the users caseloads in the 30 days:
    return checkTimeBasedAccessToCaseNotesPostTransfer(user, prisoner, caseNotesAccessPeriodPostTransferInMs)
      ? PermissionCheckStatus.OK
      : PermissionCheckStatus.NOT_PERMITTED
  },
}

const caseNotesReadAndEditCheck = matchBaseCheckAnd(caseNotesReadAndEditConditions)

export default caseNotesReadAndEditCheck

function checkTimeBasedAccessToCaseNotesPostTransfer(
  user: HmppsUser,
  prisoner: Prisoner,
  timePeriodForAccessPostTransferInMilliseconds: number,
): boolean {
  if (!isInUsersCaseLoad(prisoner.previousPrisonId, user) || !prisoner.previousPrisonLeavingDate) return false

  const previousPrisonLeavingDate = Date.parse(prisoner.previousPrisonLeavingDate)
  const today = Date.now()

  return isDateWithinBounds(previousPrisonLeavingDate, today, today - timePeriodForAccessPostTransferInMilliseconds)
}
