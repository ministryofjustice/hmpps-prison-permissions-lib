export enum PersonalRelationshipsPermission {
  // Next of kin & emergency contacts
  read_emergency_contacts = 'prisoner:emergency-contacts:read',
  edit_emergency_contacts = 'prisoner:emergency-contacts:edit',
}

export type PersonalRelationshipsPermissions = Record<PersonalRelationshipsPermission, boolean>
