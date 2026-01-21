export enum PrisonerMovesPermission {
  read_temporary_absence = 'prisoner:temporary-absence:read',
  /**/ edit_temporary_absence = 'prisoner:temporary-absence:edit',
}

export type PrisonerMovesPermissions = Record<PrisonerMovesPermission, boolean>
