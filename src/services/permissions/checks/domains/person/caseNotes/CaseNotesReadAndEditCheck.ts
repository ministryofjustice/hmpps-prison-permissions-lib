import { CaseNotesPermission } from '../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { PermissionStatus } from '../../../../../../types/internal/permissions/PermissionStatus'
import PermissionsCheckContext from '../../../PermissionsCheckContext'
import { isInUsersCaseLoad, userHasAllRoles, userHasRole } from '../../../../utils/PermissionUtils'
import { Role } from '../../../../../../types/internal/user/Role'
import { HmppsUser } from '../../../../../../types/internal/user/HmppsUser'
import Prisoner from '../../../../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { daysToMilliseconds, isDateWithinBounds } from '../../../../utils/DateUtils'
import { matchBaseCheckAnd } from '../../../../utils/PermissionCheckUtils'

const caseNotesAccessPeriodPostTransferInMs = daysToMilliseconds(90)

const caseNotesReadAndEditCheck = (permission: CaseNotesPermission, context: PermissionsCheckContext) =>
  matchBaseCheckAnd(context, permission, {
    ifTransferringPrisoner: (user, _) => {
      return userHasRole(Role.InactiveBookings, user) ? PermissionStatus.OK : PermissionStatus.PRISONER_IS_TRANSFERRING
    },
    ifInPrisonOutsideCaseload: (user, prisoner) => {
      if (!userHasAllRoles([Role.GlobalSearch, Role.PomUser], user)) return PermissionStatus.ROLE_NOT_PRESENT

      // Case notes for prisoners outside the user's caseload are only accessible with both Global Search and POM roles if the prisoner
      // was previously in one of the users caseloads in the 30 days:
      return checkTimeBasedAccessToCaseNotesPostTransfer(user, prisoner, caseNotesAccessPeriodPostTransferInMs)
        ? PermissionStatus.OK
        : PermissionStatus.NOT_PERMITTED
    },
  })

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

export default caseNotesReadAndEditCheck
