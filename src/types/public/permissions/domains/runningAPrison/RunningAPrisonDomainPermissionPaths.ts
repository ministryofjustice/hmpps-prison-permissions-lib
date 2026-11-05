import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { Path } from '../../../../internal/utils/Path'
import { RunningAPrisonDomainPermission } from './RunningAPrisonDomainPermissions'
import { prisonerVisitsAndVisitorsPermissionPaths } from './prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissionPaths'
import { prisonerBaseLocationPermissionPaths } from './prisonerBaseLocation/PrisonerBaseLocationPermissionPaths'
import { prisonerMovesPermissionPaths } from './prisonerMoves/PrisonerMovesPermissionPaths'
import { prisonerPropertyPermissionPaths } from './prisonerProperty/PrisonerPropertyPermissionPaths'

export const runningAPrisonDomainPermissionPaths: Record<RunningAPrisonDomainPermission, Path<PrisonerPermissions>> = {
  ...prisonerVisitsAndVisitorsPermissionPaths,
  ...prisonerBaseLocationPermissionPaths,
  ...prisonerMovesPermissionPaths,
  ...prisonerPropertyPermissionPaths,
}
