export enum PersonSentenceCalculationPermission {
  read = 'prisoner:person-sentence-calculation:read',
}

export interface PersonSentenceCalculationPermissions {
  // Not a full list, for demonstration purposes at the moment:
  [PersonSentenceCalculationPermission.read]: boolean
}

export function isPersonSentenceCalculationPermission(
  permission: string,
  permissions: PersonSentenceCalculationPermissions,
) {
  return permission in permissions
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
) {
  return {
    domainGroups: {
      sentenceAndOffence: {
        personSentenceCalculation: {
          [permission]: permitted,
        },
      },
    },
  }
}
