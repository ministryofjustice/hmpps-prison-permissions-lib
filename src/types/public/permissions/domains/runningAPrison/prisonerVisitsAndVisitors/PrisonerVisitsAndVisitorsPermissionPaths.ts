import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PrisonerVisitsAndVisitorsPermission } from './PrisonerVisitsAndVisitorsPermissions'

// eslint-disable-next-line import/prefer-default-export
export const prisonerVisitsAndVisitorsPermissionPaths: Record<
  PrisonerVisitsAndVisitorsPermission,
  Path<PrisonerPermissions>
> = {
  [PrisonerVisitsAndVisitorsPermission.read]: `domainGroups.runningAPrison.prisonerVisitsAndVisitors.${PrisonerVisitsAndVisitorsPermission.read}`,
}
