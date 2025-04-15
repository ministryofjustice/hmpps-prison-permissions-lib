import {
  globalSearchServicePermission,
  GlobalSearchServicePermission,
  GlobalSearchServicePermissions,
  isGlobalSearchServicePermission,
} from './GlobalSearchServicePermissions'

/**
 * These permissions define what a HMPPS user can do with respect to a HMPPS service.
 * These are any actions that a user can do WITH NO PRISONER IN CONTEXT.
 */
export interface ServicePermissions {
  services: {
    globalSearch: GlobalSearchServicePermissions
  }
}

export type ServicePermission = GlobalSearchServicePermission

export function servicePermission(permission: ServicePermission, permissions: ServicePermissions): boolean {
  if (isGlobalSearchServicePermission(permission as string, permissions.services.globalSearch)) {
    return globalSearchServicePermission(permission as GlobalSearchServicePermission, permissions.services.globalSearch)
  }

  return false
}
