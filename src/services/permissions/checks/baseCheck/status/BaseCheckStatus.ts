import { HmppsUser } from '../../../../../types/internal/user/HmppsUser'
import { PermissionStatus } from '../../../../../types/internal/permissions/PermissionStatus'
import { Role } from '../../../../../types/internal/user/Role'
import { userHasAllRoles, userHasSomeRolesFrom } from '../../../utils/PermissionUtils'
import PermissionsLogger from '../../../PermissionsLogger'
import restrictedPatientStatus from './RestrictedPatientStatus'
import {
  PermissionContext,
  PermissionStatusFunction,
} from '../../../../../types/internal/permissions/PermissionContext'

export interface PermissionRules {
  allRolesRequired?: Role[]
  atLeastOneRoleRequiredFrom?: Role[]
  ifRestrictedPatient: PermissionStatusFunction
  ifReleasedPrisoner: PermissionStatusFunction
  ifTransferringPrisoner: PermissionStatusFunction
  ifInPrisonOutsideCaseload: PermissionStatusFunction
  ifInPrisonInsideCaseload: PermissionStatusFunction
}

export function getPermissionStatus(
  context: PermissionContext,
  logger: PermissionsLogger,
  additionalRules?: PermissionRules,
): PermissionStatus {
  const { user, prisoner } = context

  // Currently we require that the user is a Prison User:
  if (user.authSource !== 'nomis') return PermissionStatus.NOT_PRISON_USER

  // Check if any blanket user roles are required:
  if (!userHasAdditionalRequiredRoles(user, additionalRules)) return PermissionStatus.ROLE_NOT_PRESENT

  // Restricted patients:
  if (prisoner.restrictedPatient) {
    const baseRestrictedPatientStatus = restrictedPatientStatus(context)
    return baseRestrictedPatientStatus === PermissionStatus.OK
      ? (additionalRules?.ifRestrictedPatient?.(context) ?? PermissionStatus.OK)
      : baseRestrictedPatientStatus
  }

  // Released prisoners:
  if (isReleased(prisoner)) {
    return checkReleasedPrisonerStatus(user, prisoner)
  }

  // Transferring prisoners:
  if (isTransferring(prisoner)) {
    return checkTransferringPrisonerStatus(user, prisoner)
  }

  // When prisoner is outside user's caseload:
  if (!inUsersCaseLoad) {
    return checkOutsideCaseloadStatus(user, prisoner)
  }

  // When prisoner is inside user's caseload:
  return PermissionStatus.OK
}

function userHasAdditionalRequiredRoles(user: HmppsUser, additionalRules?: Partial<PermissionRules>): boolean {
  if (additionalRules?.allRolesRequired && !userHasAllRoles(additionalRules.allRolesRequired, user)) {
    return false
  }

  if (
    additionalRules?.atLeastOneRoleRequiredFrom &&
    !userHasSomeRolesFrom(additionalRules.atLeastOneRoleRequiredFrom, user)
  ) {
    return false
  }

  return true
}
