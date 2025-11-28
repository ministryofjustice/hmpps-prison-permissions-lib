/*
 * The "default" access checks for accessing information about a prisoner.
 *
 * This function can be used for checking what we consider the "base checks" for accessing a page on the prisoner profile
 * when no other special cases are given.
 */
import { HmppsUser } from '../../../../../types/internal/user/HmppsUser'
import Prisoner from '../../../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { isInUsersCaseLoad, isReleased, isTransferring, userHasSomeRolesFrom } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'
import restrictedPatientStatus from './RestrictedPatientStatus'
import releasedPrisonerStatus from './ReleasedPrisonerStatus'
import transferringPrisonerStatus from './TransferringPrisonerStatus'

export default function baseCheckStatus(user: HmppsUser, prisoner: Prisoner): PermissionCheckStatus {
  const inUsersCaseLoad = isInUsersCaseLoad(prisoner.prisonId, user)
  const globalSearchUser = userHasSomeRolesFrom([Role.GlobalSearch], user)

  if (user.authSource !== 'nomis') return PermissionCheckStatus.NOT_PRISON_USER
  if (prisoner.restrictedPatient) return restrictedPatientStatus(user, prisoner)
  if (isReleased(prisoner)) return releasedPrisonerStatus(user)
  if (isTransferring(prisoner)) return transferringPrisonerStatus(user)
  if (inUsersCaseLoad || globalSearchUser) return PermissionCheckStatus.OK

  return PermissionCheckStatus.NOT_IN_CASELOAD
}
