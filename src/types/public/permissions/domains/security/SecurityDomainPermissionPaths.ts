import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { Path } from '../../../../internal/utils/Path'
import { pathfinderPermissionPaths } from './pathfinder/PathfinderPermissionPaths'
import { SecurityDomainPermission } from './SecurityDomainPermissions'
import { socPermissionPaths } from './soc/SOCPermissionPaths'

// eslint-disable-next-line import/prefer-default-export
export const securityDomainPermissionPaths: Record<SecurityDomainPermission, Path<PrisonerPermissions>> = {
  ...pathfinderPermissionPaths,
  ...socPermissionPaths,
}
