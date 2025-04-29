import {
  checkPersonSentenceCalculationAccess,
  isPersonSentenceCalculationPermission,
  PersonSentenceCalculationPermission,
  PersonSentenceCalculationPermissions,
} from './PersonSentenceCalculationPermissions'

export interface SentenceAndOffenceDomainPermissions {
  // Not a full list, for demonstration purposes at the moment:
  personSentenceCalculation: PersonSentenceCalculationPermissions
}

export type SentenceAndOffenceDomainPermission = PersonSentenceCalculationPermission

export function isSentenceAndOffenceDomainPermission(
  permission: string,
  permissions: SentenceAndOffenceDomainPermissions,
) {
  return isPersonSentenceCalculationPermission(permission, permissions.personSentenceCalculation)
}

export function checkSentenceAndOffenceDomainAccess(
  permission: SentenceAndOffenceDomainPermission,
  permissions: SentenceAndOffenceDomainPermissions,
): boolean {
  if (isPersonSentenceCalculationPermission(permission, permissions.personSentenceCalculation)) {
    return checkPersonSentenceCalculationAccess(
      permission as PersonSentenceCalculationPermission,
      permissions.personSentenceCalculation,
    )
  }

  return false
}
