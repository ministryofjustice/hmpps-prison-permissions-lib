import { PersonSentenceCalculationPermission } from './PersonSentenceCalculationPermissions'
import {
  checkPersonSentenceCalculationAccess,
  isPersonSentenceCalculationPermission,
} from './PersonSentenceCalculationPermissionsUtils'
import {
  SentenceAndOffenceDomainPermission,
  SentenceAndOffenceDomainPermissions,
} from './SentenceAndOffenceDomainPermissions'

export function isSentenceAndOffenceDomainPermission(
  permission: string,
  permissions: SentenceAndOffenceDomainPermissions,
) {
  return isPersonSentenceCalculationPermission(permission, permissions?.personSentenceCalculation)
}

export function checkSentenceAndOffenceDomainAccess(
  permission: SentenceAndOffenceDomainPermission,
  permissions: SentenceAndOffenceDomainPermissions,
): boolean {
  if (isPersonSentenceCalculationPermission(permission, permissions?.personSentenceCalculation)) {
    return checkPersonSentenceCalculationAccess(
      permission as PersonSentenceCalculationPermission,
      permissions.personSentenceCalculation,
    )
  }

  return false
}
