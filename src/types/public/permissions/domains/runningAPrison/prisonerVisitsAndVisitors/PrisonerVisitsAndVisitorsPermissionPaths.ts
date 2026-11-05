import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PrisonerVisitsAndVisitorsPermission } from './PrisonerVisitsAndVisitorsPermissions'

export const prisonerVisitsAndVisitorsPermissionPaths: Record<
  PrisonerVisitsAndVisitorsPermission,
  Path<PrisonerPermissions>
> = {
  [PrisonerVisitsAndVisitorsPermission.read]: `domainGroups.runningAPrison.prisonerVisitsAndVisitors.${PrisonerVisitsAndVisitorsPermission.read}`,
}
