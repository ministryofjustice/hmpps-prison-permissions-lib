/*
 * The "default" access checks for accessing information about a prisoner.
 *
 * This function can be used for checking what we consider the "base checks" for accessing a page on the prisoner profile
 * when no other special cases are given.
 */
import { HmppsUser } from '../../../../../types/user/HmppsUser'
import Prisoner from '../../../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { isInUsersCaseLoad, userHasSomeRolesFrom } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../../types/permissions/PermissionCheckStatus'
import restrictedPatientStatus from './RestrictedPatientStatus'
import releasedPrisonerStatus from './ReleasedPrisonerStatus'
import transferringPrisonerStatus from './TransferringPrisonerStatus'

export default function baseCheckStatus(user: HmppsUser, prisoner: Prisoner): PermissionCheckStatus {
  const inUsersCaseLoad = isInUsersCaseLoad(prisoner.prisonId, user)
  const globalSearchUser = userHasSomeRolesFrom([Role.GlobalSearch], user.userRoles)

  if (prisoner.restrictedPatient) return restrictedPatientStatus(user, prisoner)
  if (prisoner.prisonId === 'OUT') return releasedPrisonerStatus(user)
  if (prisoner.prisonId === 'TRN') return transferringPrisonerStatus(user)
  if (inUsersCaseLoad || globalSearchUser) return PermissionCheckStatus.OK

  return PermissionCheckStatus.NOT_IN_CASELOAD
}
