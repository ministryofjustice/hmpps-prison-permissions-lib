import { Operations } from '../Operations'

export enum GlobalSearchServicePermission {
  performSearch = 'service:global-search:perform-search',
}

export interface GlobalSearchServicePermissions {
  // Not a full list, for demonstration purposes at the moment:
  [GlobalSearchServicePermission.performSearch]: boolean
}

export function isGlobalSearchServicePermission(permission: string, permissions: GlobalSearchServicePermissions) {
  return permission in permissions
}

export function globalSearchServicePermission(
  permission: GlobalSearchServicePermission,
  permissions: GlobalSearchServicePermissions,
): boolean {
  return permissions[permission]
}
