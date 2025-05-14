import { PathfinderPermission, PathfinderPermissions } from './pathfinder/PathfinderPermissions'
import { SOCPermission, SOCPermissions } from './soc/SOCPermissions'

export interface SecurityDomainPermissions {
  pathfinder: PathfinderPermissions
  soc: SOCPermissions
}

export type SecurityDomainPermission = PathfinderPermission | SOCPermission
