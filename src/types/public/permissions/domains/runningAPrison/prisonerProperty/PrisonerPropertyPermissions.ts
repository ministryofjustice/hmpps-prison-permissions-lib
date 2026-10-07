export enum PrisonerPropertyPermission {
  read_property_overview = 'prisoner:property:overview:read',
  read_property_details = 'prisoner:property:details:read',
  edit_property_details = 'prisoner:property:details:edit',
}

export type PrisonerPropertyPermissions = Record<PrisonerPropertyPermission, boolean>
