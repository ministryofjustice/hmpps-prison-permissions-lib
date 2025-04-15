export enum CorePersonRecordPermission {
  read_height = 'prisoner:core-person-record:height:read',
  read_weight = 'prisoner:core-person-record:weight:read',
}

export interface CorePersonRecordPermissions {
  // Not a full list, for demonstration purposes at the moment:
  [CorePersonRecordPermission.read_height]: boolean
  [CorePersonRecordPermission.read_weight]: boolean
}

export function isCorePersonRecordPermission(permission: string, permissions: CorePersonRecordPermissions) {
  return permission in permissions
}

export function checkCorePersonRecordAccess(
  permission: CorePersonRecordPermission,
  permissions: CorePersonRecordPermissions,
): boolean {
  return permissions[permission]
}
