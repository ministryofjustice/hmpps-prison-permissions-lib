export enum PrisonerSchedulePermission {
  edit = 'prisoner:schedule:edit',
}

export type PrisonerSchedulePermissions = Record<PrisonerSchedulePermission, boolean>
