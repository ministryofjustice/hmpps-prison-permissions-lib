import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PathfinderPermission } from './PathfinderPermissions'

// eslint-disable-next-line import/prefer-default-export
export const pathfinderPermissionPaths: Record<PathfinderPermission, Path<PrisonerPermissions>> = {
  [PathfinderPermission.read]: `domainGroups.security.pathfinder.${PathfinderPermission.read}`,
  [PathfinderPermission.edit]: `domainGroups.security.pathfinder.${PathfinderPermission.edit}`,
}
