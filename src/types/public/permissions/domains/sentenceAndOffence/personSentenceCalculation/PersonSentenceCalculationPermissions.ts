export enum PersonSentenceCalculationPermission {
  read = 'prisoner:person-sentence-calculation:read',
  edit = 'prisoner:person-sentence-calculation:edit',
  edit_adjustments = 'prisoner:person-sentence-calculation:adjustments:edit',
}

export type PersonSentenceCalculationPermissions = Record<PersonSentenceCalculationPermission, boolean>
