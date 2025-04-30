export enum PersonSentenceCalculationPermission {
  read = 'prisoner:person-sentence-calculation:read',
  edit_adjustments = 'prisoner:person-sentence-calculation:adjustments:edit',
}

export interface PersonSentenceCalculationPermissions {
  [PersonSentenceCalculationPermission.read]: boolean
  [PersonSentenceCalculationPermission.edit_adjustments]: boolean
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
