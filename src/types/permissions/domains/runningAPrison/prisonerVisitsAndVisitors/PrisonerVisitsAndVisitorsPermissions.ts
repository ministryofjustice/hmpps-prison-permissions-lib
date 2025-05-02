export enum PrisonerVisitsAndVisitorsPermission {
  read = 'prisoner:prisoner-visits-and-visitors:read',
}

export interface PrisonerVisitsAndVisitorsPermissions {
  [PrisonerVisitsAndVisitorsPermission.read]: boolean
}
