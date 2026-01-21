import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { Path } from '../../../../internal/utils/Path'
import { RunningAPrisonDomainPermission } from './RunningAPrisonDomainPermissions'
import { prisonerVisitsAndVisitorsPermissionPaths } from './prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissionPaths'
import { prisonerBaseLocationPermissionPaths } from './prisonerBaseLocation/PrisonerBaseLocationPermissionPaths'
import { prisonerMovesPermissionPaths } from './prisonerMoves/PrisonerMovesPermissionPaths'

// eslint-disable-next-line import/prefer-default-export
export const runningAPrisonDomainPermissionPaths: Record<RunningAPrisonDomainPermission, Path<PrisonerPermissions>> = {
  ...prisonerVisitsAndVisitorsPermissionPaths,
  ...prisonerBaseLocationPermissionPaths,
  ...prisonerMovesPermissionPaths,
}
