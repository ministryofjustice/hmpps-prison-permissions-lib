export enum PersonCommunicationNeedsPermission {
  read_language = 'prisoner:language:read',
  edit_language = 'prisoner:language:edit',
}

export type PersonCommunicationNeedsPermissions = Record<PersonCommunicationNeedsPermission, boolean>
