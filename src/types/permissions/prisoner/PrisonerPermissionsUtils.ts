import { PrisonerPermission, PrisonerPermissions } from './PrisonerPermissions'
import { prisonerPermissionPaths } from './PrisonerPermissionPaths'

export default function checkPrisonerPermission(
  permission: PrisonerPermission,
  permissions: PrisonerPermissions,
): boolean {
  // @ts-expect-error TS cannot guarantee the path ends with a boolean
  return prisonerPermissionPaths[permission].split('.').reduce((o, key) => o && o[key], permissions)
}
