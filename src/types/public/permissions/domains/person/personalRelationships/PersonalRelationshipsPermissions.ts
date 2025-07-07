export enum PersonalRelationshipsPermission {
  // Next of kin & emergency contacts
  read_emergency_contacts = 'prisoner:emergency-contacts:read',
  edit_emergency_contacts = 'prisoner:emergency-contacts:edit',

  read_number_of_children = 'prisoner:number-of-children:read',
  edit_number_of_children = 'prisoner:number-of-children:edit',

  read_domestic_status = 'prisoner:domestic-status:read',
  edit_domestic_status = 'prisoner:domestic-status:edit',
}

export type PersonalRelationshipsPermissions = Record<PersonalRelationshipsPermission, boolean>
