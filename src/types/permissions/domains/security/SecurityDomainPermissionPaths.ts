import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { Path } from '../../../utils/Path'
import { pathfinderPermissionPaths } from './pathfinder/PathfinderPermissionPaths'
import { SecurityDomainPermission } from './SecurityDomainPermissions'

// eslint-disable-next-line import/prefer-default-export
export const securityDomainPermissionPaths: Record<SecurityDomainPermission, Path<PrisonerPermissions>> = {
  ...pathfinderPermissionPaths,
}
