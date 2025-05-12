export enum PathfinderPermission {
  read = 'prisoner:pathfinder:read',
  edit = 'prisoner:pathfinder:edit',
}

export type PathfinderPermissions = Record<PathfinderPermission, boolean>
