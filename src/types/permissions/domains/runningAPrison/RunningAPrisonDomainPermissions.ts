import {
  PrisonerVisitsAndVisitorsPermission,
  PrisonerVisitsAndVisitorsPermissions,
} from './prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'

export interface RunningAPrisonDomainPermissions {
  prisonerVisitsAndVisitors: PrisonerVisitsAndVisitorsPermissions
}

export type RunningAPrisonDomainPermission = PrisonerVisitsAndVisitorsPermission
