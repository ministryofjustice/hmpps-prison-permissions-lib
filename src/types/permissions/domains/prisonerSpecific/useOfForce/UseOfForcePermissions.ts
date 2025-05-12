export enum UseOfForcePermission {
  edit = 'prisoner:use-of-force:edit',
}

export type UseOfForcePermissions = Record<UseOfForcePermission, boolean>
