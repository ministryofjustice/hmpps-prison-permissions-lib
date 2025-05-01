export enum PersonSentenceCalculationPermission {
  read = 'prisoner:person-sentence-calculation:read',
  edit_adjustments = 'prisoner:person-sentence-calculation:adjustments:edit',
}

export interface PersonSentenceCalculationPermissions {
  [PersonSentenceCalculationPermission.read]: boolean
  [PersonSentenceCalculationPermission.edit_adjustments]: boolean
}
