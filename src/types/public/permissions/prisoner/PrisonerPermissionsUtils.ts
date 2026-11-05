import { PrisonerPermission, PrisonerPermissions } from './PrisonerPermissions'
import { prisonerPermissionPaths } from './PrisonerPermissionPaths'

export function isGranted(permission: PrisonerPermission, permissions: PrisonerPermissions | undefined): boolean {
  // @ts-expect-error TS cannot guarantee the path ends with a boolean
  return prisonerPermissionPaths[permission].split('.').reduce((o, key) => o && o[key], permissions || {})
}
