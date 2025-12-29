import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import {
  PrisonerVisitsAndVisitorsPermission,
  PrisonerVisitsAndVisitorsPermissions,
} from '../../../../../../types/public/permissions/domains/runningAPrison/prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'
import { checkWith } from '../../../../utils/PermissionCheckUtils'
import prisonerVisitsAndVisitorsReadCheck from './prisonerVisitsAndVisitorsRead/PrisonerVisitsAndVisitorsReadCheck'

export default function prisonerVisitsAndVisitorsCheck(
  context: PrisonerPermissionsContext,
): PrisonerVisitsAndVisitorsPermissions {
  const check = checkWith(context)
  return {
    ...check(PrisonerVisitsAndVisitorsPermission.read, prisonerVisitsAndVisitorsReadCheck),
  }
}
