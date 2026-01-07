export enum PrisonerSchedulePermission {
  read_schedule = 'prisoner:schedule:read',
  edit_appointment = 'prisoner:appointment:edit',
  edit_activity = 'prisoner:activity:edit',
}

export type PrisonerSchedulePermissions = Record<PrisonerSchedulePermission, boolean>
