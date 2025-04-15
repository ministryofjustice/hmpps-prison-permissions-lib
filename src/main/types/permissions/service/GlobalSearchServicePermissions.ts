export enum GlobalSearchServicePermission {
  perform_search = 'service:global-search:perform-search',
}

export interface GlobalSearchServicePermissions {
  // Not a full list, for demonstration purposes at the moment:
  [GlobalSearchServicePermission.perform_search]: boolean
}

export function isGlobalSearchServicePermission(permission: string, permissions: GlobalSearchServicePermissions) {
  return permission in permissions
}

export function checkGlobalSearchServiceAccess(
  permission: GlobalSearchServicePermission,
  permissions: GlobalSearchServicePermissions,
): boolean {
  return permissions[permission]
}
