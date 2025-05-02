import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import prisonerVisitsAndVisitorsReadCheck from './prisonerVisitsAndVisitorsRead/PrisonerVisitsAndVisitorsReadCheck'
import {
  PrisonerVisitsAndVisitorsPermission,
  PrisonerVisitsAndVisitorsPermissions,
} from '../../../../../../types/permissions/domains/runningAPrison/prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'

export default function prisonerVisitsAndVisitorsCheck(
  request: PermissionsCheckRequest,
): PrisonerVisitsAndVisitorsPermissions {
  return {
    [PrisonerVisitsAndVisitorsPermission.read]: prisonerVisitsAndVisitorsReadCheck(request),
  }
}
