export enum PersonProtectedCharacteristicsPermission {
  read_sexual_orientation = 'prisoner:sexual-orientation:read',
  edit_sexual_orientation = 'prisoner:sexual-orientation:edit',

  read_religion_and_belief = 'prisoner:religion-and-belief:read',
  edit_religion_and_belief = 'prisoner:religion-and-belief:edit',

  read_ethnicity = 'prisoner:ethnicity:read',
  edit_ethnicity = 'prisoner:ethnicity:edit',
}

export type PersonProtectedCharacteristicsPermissions = Record<PersonProtectedCharacteristicsPermission, boolean>
