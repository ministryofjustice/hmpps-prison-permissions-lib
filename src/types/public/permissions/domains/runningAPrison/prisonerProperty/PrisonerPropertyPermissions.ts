export enum PrisonerPropertyPermission {
  read_property = 'prisoner:property:read',
  edit_property = 'prisoner:property:edit',
}

export type PrisonerPropertyPermissions = Record<PrisonerPropertyPermission, boolean>
