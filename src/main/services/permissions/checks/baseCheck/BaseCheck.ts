/*
 * The "default" access checks for accessing information about a prisoner.
 *
 * This function can be used for checking what we consider the "base checks" for accessing a page on the prisoner profile
 * when no other special cases are given.
 *
 * It provides the following options for special circumstances:
 *
 * - allowGlobal (default: true): Does the page allow access to users outside the prisoners current case load
 */
import { HmppsUser } from '../../../../types/user/HmppsUser'
import Prisoner from '../../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { isInUsersCaseLoad, userHasRoles } from '../../utils/PermissionUtils'
import { Role } from '../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../types/permissions/PermissionCheckStatus'
import restrictedPatientCheck from './RestrictedPatientCheck'
import releasedPrisonerCheck from './ReleasedPrisonerCheck'
import transferringPrisonerCheck from './TransferingPrisonerCheck'

export default function baseCheck(user: HmppsUser, prisoner: Prisoner): PermissionCheckStatus {
  const inUsersCaseLoad = isInUsersCaseLoad(prisoner.prisonId, user)
  const globalSearchUser = userHasRoles([Role.GlobalSearch], user.userRoles)

  if (prisoner.restrictedPatient) return restrictedPatientCheck(user, prisoner)
  if (prisoner.prisonId === 'OUT') return releasedPrisonerCheck(user)
  if (prisoner.prisonId === 'TRN') return transferringPrisonerCheck(user)
  if (inUsersCaseLoad || globalSearchUser) return PermissionCheckStatus.OK

  return PermissionCheckStatus.NOT_IN_CASELOAD
}
