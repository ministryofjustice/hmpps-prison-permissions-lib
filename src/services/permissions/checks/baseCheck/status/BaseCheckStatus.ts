/*
 * The "default" access checks for accessing information about a prisoner.
 *
 * This function can be used for checking what we consider the "base checks" for accessing a page on the prisoner profile
 * when no other special cases are given.
 */
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'
import restrictedPatientStatus from './RestrictedPatientStatus'
import releasedPrisonerStatus from './ReleasedPrisonerStatus'
import transferringPrisonerStatus from './TransferringPrisonerStatus'
import { getPermissionStatus, PrisonerPermissionStatusFunction } from '../../../PrisonerPermissionConditions'
import prisonNotInCaseloadStatus from './PrisonNotInCaseloadStatus'

export const baseCheckConditions = {
  ifRestrictedPatient: restrictedPatientStatus,
  ifReleasedPrisoner: releasedPrisonerStatus,
  ifTransferringPrisoner: transferringPrisonerStatus,
  ifPrisonNotInCaseload: prisonNotInCaseloadStatus,
  ifPrisonInCaseload: () => PermissionCheckStatus.OK,
}

export const baseCheckStatus: PrisonerPermissionStatusFunction = (user, prisoner) =>
  getPermissionStatus(user, prisoner, baseCheckConditions)
