import { PathfinderPermission, PathfinderPermissions } from './pathfinder/PathfinderPermissions'

export interface SecurityDomainPermissions {
  pathfinder: PathfinderPermissions
}

export type SecurityDomainPermission = PathfinderPermission
