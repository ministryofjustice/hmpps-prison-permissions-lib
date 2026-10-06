import {
  PrisonerVisitsAndVisitorsPermission,
  PrisonerVisitsAndVisitorsPermissions,
} from './prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'
import {
  PrisonerBaseLocationPermission,
  PrisonerBaseLocationPermissions,
} from './prisonerBaseLocation/PrisonerBaseLocationPermissions'
import { PrisonerMovesPermission, PrisonerMovesPermissions } from './prisonerMoves/PrisonerMovesPermissions'
import { PrisonerPropertyPermission, PrisonerPropertyPermissions } from './prisonerProperty/PrisonerPropertyPermissions'

export interface RunningAPrisonDomainPermissions {
  prisonerVisitsAndVisitors: PrisonerVisitsAndVisitorsPermissions
  prisonerBaseLocation: PrisonerBaseLocationPermissions
  prisonerMoves: PrisonerMovesPermissions
  prisonerProperty: PrisonerPropertyPermissions
}

export type RunningAPrisonDomainPermission =
  | PrisonerVisitsAndVisitorsPermission
  | PrisonerBaseLocationPermission
  | PrisonerMovesPermission
  | PrisonerPropertyPermission
