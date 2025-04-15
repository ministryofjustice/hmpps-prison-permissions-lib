export enum PersonPersonalRelationshipsPermission {
  read_domestic_status = 'prisoner:person-personal-relationships:domestic-status:read',
  read_number_of_children = 'prisoner:person-personal-relationships:number-of-children:read',
}

export interface PersonPersonalRelationshipsPermissions {
  // Not a full list, for demonstration purposes at the moment:
  [PersonPersonalRelationshipsPermission.read_domestic_status]: boolean
  [PersonPersonalRelationshipsPermission.read_number_of_children]: boolean
}

export function isPersonPersonalRelationshipsPermission(
  permission: string,
  permissions: PersonPersonalRelationshipsPermissions,
) {
  return permission in permissions
}

export function checkPersonPersonalRelationshipAccess(
  permission: PersonPersonalRelationshipsPermission,
  permissions: PersonPersonalRelationshipsPermissions,
): boolean {
  return permissions[permission]
}
