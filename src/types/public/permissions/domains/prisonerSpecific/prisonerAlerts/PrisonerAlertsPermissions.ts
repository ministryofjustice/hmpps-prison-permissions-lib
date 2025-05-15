export enum PrisonerAlertsPermission {
  edit = 'prisoner:prisoner-alerts:edit',
}

export type PrisonerAlertsPermissions = Record<PrisonerAlertsPermission, boolean>
