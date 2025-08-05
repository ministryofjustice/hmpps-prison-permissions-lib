import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import inUsersCaseLoad from '../../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoad'
import { PrisonerVisitsAndVisitorsPermission } from '../../../../../../../types/public/permissions/domains/runningAPrison/prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'

export default function prisonerVisitsAndVisitorsReadCheck(request: PermissionsCheckRequest) {
  return inUsersCaseLoad(PrisonerVisitsAndVisitorsPermission.read, request)
}
