import PermissionsCheckContext from '../../../PermissionsCheckContext'
import prisonerVisitsAndVisitorsReadCheck from './prisonerVisitsAndVisitorsRead/PrisonerVisitsAndVisitorsReadCheck'
import {
  PrisonerVisitsAndVisitorsPermission,
  PrisonerVisitsAndVisitorsPermissions,
} from '../../../../../../types/public/permissions/domains/runningAPrison/prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'

export default function prisonerVisitsAndVisitorsCheck(
  context: PermissionsCheckContext,
): PrisonerVisitsAndVisitorsPermissions {
  return {
    [PrisonerVisitsAndVisitorsPermission.read]: prisonerVisitsAndVisitorsReadCheck(context),
  }
}
