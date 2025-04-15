import { Operations } from '../../Operations'

export enum PersonCommunicationNeedsPermission {
  writingLevel = 'prisoner:person-communication-needs:writing-level',
  numeracy = 'prisoner:person-communication-needs:numeracy',
}
export interface PersonCommunicationNeedsPermissions {
  // Not a full list, for demonstration purposes at the moment:
  [PersonCommunicationNeedsPermission.writingLevel]: Operations
  [PersonCommunicationNeedsPermission.numeracy]: Operations
}

export function isPersonCommunicationNeedsPermission(
  permission: string,
  permissions: PersonCommunicationNeedsPermissions,
) {
  return permission in permissions
}

export function personCommunicationNeedsPermission(
  permission: PersonCommunicationNeedsPermission,
  permissions: PersonCommunicationNeedsPermissions,
): Operations {
  return permissions[permission]
}
