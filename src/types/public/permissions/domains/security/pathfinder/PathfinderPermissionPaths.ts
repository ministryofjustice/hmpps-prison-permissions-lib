import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PathfinderPermission } from './PathfinderPermissions'

export const pathfinderPermissionPaths: Record<PathfinderPermission, Path<PrisonerPermissions>> = {
  [PathfinderPermission.read]: `domainGroups.security.pathfinder.${PathfinderPermission.read}`,
  [PathfinderPermission.edit]: `domainGroups.security.pathfinder.${PathfinderPermission.edit}`,
}
