import { Operations } from '../../Operations'

export enum CorePersonRecordPermission {
  height = 'prisoner:core-person-record:height',
  weight = 'prisoner:core-person-record:weight',
}

export interface CorePersonRecordPermissions {
  // Not a full list, for demonstration purposes at the moment:
  [CorePersonRecordPermission.height]: Operations
  [CorePersonRecordPermission.weight]: Operations
}

export function isCorePersonRecordPermission(permission: string, permissions: CorePersonRecordPermissions) {
  return permission in permissions
}

export function corePersonRecordPermission(
  permission: CorePersonRecordPermission,
  permissions: CorePersonRecordPermissions,
): Operations {
  return permissions[permission]
}
