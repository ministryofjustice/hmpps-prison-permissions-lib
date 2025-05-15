export enum PrisonerBaseLocationPermission {
  read_location_details = 'prisoner:location-details:read',
  read_location_history = 'prisoner:location-history:read',
  move_cell = 'prisoner:location-cell:edit',
}

export type PrisonerBaseLocationPermissions = Record<PrisonerBaseLocationPermission, boolean>
