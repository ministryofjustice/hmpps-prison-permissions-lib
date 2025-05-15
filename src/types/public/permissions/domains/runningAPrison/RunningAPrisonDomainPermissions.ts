import {
  PrisonerVisitsAndVisitorsPermission,
  PrisonerVisitsAndVisitorsPermissions,
} from './prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'
import {
  PrisonerBaseLocationPermission,
  PrisonerBaseLocationPermissions,
} from './prisonerBaseLocation/PrisonerBaseLocationPermissions'

export interface RunningAPrisonDomainPermissions {
  prisonerVisitsAndVisitors: PrisonerVisitsAndVisitorsPermissions
  prisonerBaseLocation: PrisonerBaseLocationPermissions
}

export type RunningAPrisonDomainPermission = PrisonerVisitsAndVisitorsPermission | PrisonerBaseLocationPermission
