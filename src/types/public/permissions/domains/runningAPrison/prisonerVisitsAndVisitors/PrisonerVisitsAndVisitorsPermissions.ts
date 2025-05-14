export enum PrisonerVisitsAndVisitorsPermission {
  read = 'prisoner:prisoner-visits-and-visitors:read',
}

export type PrisonerVisitsAndVisitorsPermissions = Record<PrisonerVisitsAndVisitorsPermission, boolean>
