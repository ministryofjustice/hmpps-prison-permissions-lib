export enum PersonHealthAndMedicationPermission {
  read_pregnancy = 'prisoner:pregnancy:read',
  edit_pregnancy = 'prisoner:pregnancy:edit',

  read_diet = 'prisoner:diet:read',
  edit_diet = 'prisoner:diet:edit',

  read_smoker = 'prisoner:smoker:read',
  edit_smoker = 'prisoner:smoker:edit',
}

export type PersonHealthAndMedicationPermissions = Record<PersonHealthAndMedicationPermission, boolean>
