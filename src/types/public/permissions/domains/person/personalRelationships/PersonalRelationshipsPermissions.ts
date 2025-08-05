export enum PersonalRelationshipsPermission {
  read_number_of_children = 'prisoner:number-of-children:read',
  edit_number_of_children = 'prisoner:number-of-children:edit',

  read_domestic_status = 'prisoner:domestic-status:read',
  edit_domestic_status = 'prisoner:domestic-status:edit',

  // Next of kin & emergency contacts (via prisoner profile)
  // This needs a review once both the contacts service and the
  // profile edit have been rolled out wider:
  read_emergency_contacts = 'prisoner:emergency-contacts:read',
  edit_emergency_contacts = 'prisoner:emergency-contacts:edit',

  // All social and official contacts:
  read_contacts = 'prisoner:contacts:read',
  edit_contacts = 'prisoner:contacts:edit',
  edit_contact_restrictions = 'prisoner:contact-restrictions:edit',
  edit_contact_visit_approval = 'prisoner:contact-visit-approval:edit',
}

export type PersonalRelationshipsPermissions = Record<PersonalRelationshipsPermission, boolean>
