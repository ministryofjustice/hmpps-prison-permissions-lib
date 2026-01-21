import {
  PrisonerVisitsAndVisitorsPermission,
  PrisonerVisitsAndVisitorsPermissions,
} from './prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'
import {
  PrisonerBaseLocationPermission,
  PrisonerBaseLocationPermissions,
} from './prisonerBaseLocation/PrisonerBaseLocationPermissions'
import { PrisonerMovesPermission, PrisonerMovesPermissions } from './prisonerMoves/PrisonerMovesPermissions'

export interface RunningAPrisonDomainPermissions {
  prisonerVisitsAndVisitors: PrisonerVisitsAndVisitorsPermissions
  prisonerBaseLocation: PrisonerBaseLocationPermissions
  prisonerMoves: PrisonerMovesPermissions
}

export type RunningAPrisonDomainPermission =
  | PrisonerVisitsAndVisitorsPermission
  | PrisonerBaseLocationPermission
  | PrisonerMovesPermission
