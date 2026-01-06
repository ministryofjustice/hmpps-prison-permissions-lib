import { Role } from '../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../types/internal/permissions/PermissionCheckStatus'
import { HmppsUser } from '../../types/internal/user/HmppsUser'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import {
  isInUsersCaseLoad,
  isReleased,
  isTransferring,
  userHasAllRoles,
  userHasSomeRolesFrom,
} from './utils/PermissionUtils'

export type PrisonerPermissionStatusFunction = (user: HmppsUser, prisoner: Prisoner) => PermissionCheckStatus

export interface PrisonerPermissionConditions {
  allRolesRequired?: Role[]
  atLeastOneRoleRequiredFrom?: Role[]
  overridingCondition?: PrisonerPermissionStatusFunction
  ifRestrictedPatient: PrisonerPermissionStatusFunction
  ifReleasedPrisoner: PrisonerPermissionStatusFunction
  ifTransferringPrisoner: PrisonerPermissionStatusFunction
  ifPrisonNotInCaseload: PrisonerPermissionStatusFunction
  ifPrisonInCaseload: PrisonerPermissionStatusFunction
}

export function getPermissionStatus(
  user: HmppsUser,
  prisoner: Prisoner,
  conditions: PrisonerPermissionConditions,
): PermissionCheckStatus {
  // Currently we always require that the user is a Prison User:
  if (user.authSource !== 'nomis') return PermissionCheckStatus.NOT_PRISON_USER

  // Check if any blanket user roles are required:
  if (!userHasAdditionalRequiredRoles(user, conditions)) return PermissionCheckStatus.ROLE_NOT_PRESENT

  // Check if there's an overriding condition that takes precedence:
  if (conditions.overridingCondition) return conditions.overridingCondition(user, prisoner)

  // Restricted patients:
  if (prisoner.restrictedPatient) return conditions.ifRestrictedPatient(user, prisoner)

  // Released prisoners:
  if (isReleased(prisoner)) return conditions.ifReleasedPrisoner(user, prisoner)

  // Transferring prisoners:
  if (isTransferring(prisoner)) return conditions.ifTransferringPrisoner(user, prisoner)

  // When prisoner is outside user's caseload:
  if (!isInUsersCaseLoad(prisoner.prisonId, user)) return conditions.ifPrisonNotInCaseload(user, prisoner)

  // When prisoner IS inside user's caseload:
  return conditions.ifPrisonInCaseload(user, prisoner)
}

function userHasAdditionalRequiredRoles(user: HmppsUser, conditions: PrisonerPermissionConditions): boolean {
  if (conditions.allRolesRequired && !userHasAllRoles(conditions.allRolesRequired, user)) {
    return false
  }

  if (conditions.atLeastOneRoleRequiredFrom && !userHasSomeRolesFrom(conditions.atLeastOneRoleRequiredFrom, user)) {
    return false
  }

  return true
}
