export enum CorePersonRecordPermission {
  read_physical_characteristics = 'prisoner:physical_characteristics:read',
  edit_physical_characteristics = 'prisoner:physical_characteristics:edit',

  read_photo = 'prisoner:photo:read',
  edit_photo = 'prisoner:photo:edit',

  read_place_of_birth = 'prisoner:place-of-birth:read',
  edit_place_of_birth = 'prisoner:place-of-birth:edit',

  read_military_history = 'prisoner:military-history:read',
  edit_military_history = 'prisoner:military-history:edit',

  read_name_and_aliases = 'prisoner:name-and-aliases:read',
  edit_name_and_aliases = 'prisoner:name-and-aliases:edit',

  read_date_of_birth = 'prisoner:date-of-birth:read',
  edit_date_of_birth = 'prisoner:date-of-birth:edit',

  // (Prisoner's address)
  read_address = 'prisoner:address:read',
  edit_address = 'prisoner:address:edit',

  read_nationality = 'prisoner:nationality:read',
  edit_nationality = 'prisoner:nationality:edit',

  // (Such as PNC / CRO / NI number...)
  read_identifiers = 'prisoner:identifiers:read',
  edit_identifiers = 'prisoner:identifiers:edit',

  read_phone_numbers = 'prisoner:phone-numbers:read',
  edit_phone_numbers = 'prisoner:phone-numbers:edit',

  read_email_addresses = 'prisoner:email-addresses:read',
  edit_email_addresses = 'prisoner:email-addresses:edit',

  read_distinguishing_marks = 'prisoner:distinguishing-marks:read',
  edit_distinguishing_marks = 'prisoner:distinguishing-marks:edit',
}

export type CorePersonRecordPermissions = Record<CorePersonRecordPermission, boolean>
