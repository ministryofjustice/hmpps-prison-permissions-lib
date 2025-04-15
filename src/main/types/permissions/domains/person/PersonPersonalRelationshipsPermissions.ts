import { Operations } from '../../Operations'

export enum PersonPersonalRelationshipsPermission {
  domesticStatus = 'prisoner:person-personal-relationships:domestic-status',
  numberOfChildren = 'prisoner:person-personal-relationships:number-of-children',
}

export interface PersonPersonalRelationshipsPermissions {
  // Not a full list, for demonstration purposes at the moment:
  [PersonPersonalRelationshipsPermission.domesticStatus]: Operations
  [PersonPersonalRelationshipsPermission.numberOfChildren]: Operations
}

export function isPersonPersonalRelationshipsPermission(
  permission: string,
  permissions: PersonPersonalRelationshipsPermissions,
) {
  return permission in permissions
}

export function personPersonalRelationshipPermission(
  permission: PersonPersonalRelationshipsPermission,
  permissions: PersonPersonalRelationshipsPermissions,
): Operations {
  return permissions[permission]
}
