import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { prisonerPermissionsMock } from '../../../../../testUtils/PrisonerPermissionsMock'
import {
  PersonSentenceCalculationPermission,
  PersonSentenceCalculationPermissions,
} from './PersonSentenceCalculationPermissions'

export function isPersonSentenceCalculationPermission(
  permission: string,
  permissions: PersonSentenceCalculationPermissions,
) {
  return permission in (permissions || {})
}

export function checkPersonSentenceCalculationAccess(
  permission: PersonSentenceCalculationPermission,
  permissions: PersonSentenceCalculationPermissions,
): boolean {
  return permissions[permission]
}

export function setPersonSentenceCalculationPermission(
  permission: PersonSentenceCalculationPermission,
  permitted: boolean,
  permissions: PrisonerPermissions = prisonerPermissionsMock as PrisonerPermissions,
): PrisonerPermissions {
  return {
    ...permissions,
    domainGroups: {
      ...permissions.domainGroups,
      sentenceAndOffence: {
        ...permissions.domainGroups?.sentenceAndOffence,
        personSentenceCalculation: {
          ...permissions.domainGroups?.sentenceAndOffence?.personSentenceCalculation,
          [permission]: permitted,
        },
      },
    },
  }
}
