export enum PersonCommunicationNeedsPermission {
  read_writing_level = 'prisoner:person-communication-needs:writing-level:read',
  read_numeracy = 'prisoner:person-communication-needs:numeracy:read',
}
export interface PersonCommunicationNeedsPermissions {
  // Not a full list, for demonstration purposes at the moment:
  [PersonCommunicationNeedsPermission.read_writing_level]: boolean
  [PersonCommunicationNeedsPermission.read_numeracy]: boolean
}

export function isPersonCommunicationNeedsPermission(
  permission: string,
  permissions: PersonCommunicationNeedsPermissions,
) {
  return permission in permissions
}

export function checkPersonCommunicationNeedsAccess(
  permission: PersonCommunicationNeedsPermission,
  permissions: PersonCommunicationNeedsPermissions,
): boolean {
  return permissions[permission]
}
