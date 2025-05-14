import { PrisonerPermission, PrisonerPermissions } from './PrisonerPermissions'
import { prisonerPermissionPaths } from './PrisonerPermissionPaths'

// eslint-disable-next-line import/prefer-default-export
export function isGranted(permission: PrisonerPermission, permissions: PrisonerPermissions | undefined): boolean {
  // @ts-expect-error TS cannot guarantee the path ends with a boolean
  return prisonerPermissionPaths[permission].split('.').reduce((o, key) => o && o[key], permissions || {})
}
