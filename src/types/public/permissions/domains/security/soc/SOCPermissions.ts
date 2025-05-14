export enum SOCPermission {
  read = 'prisoner:soc:read',
  edit = 'prisoner:soc:edit',
}

export type SOCPermissions = Record<SOCPermission, boolean>
