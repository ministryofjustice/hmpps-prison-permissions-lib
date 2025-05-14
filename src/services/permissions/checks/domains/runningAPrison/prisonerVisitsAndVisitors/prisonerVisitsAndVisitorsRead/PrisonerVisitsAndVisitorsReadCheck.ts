import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import baseCheckAndInUsersCaseLoad from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndInUsersCaseLoad'
import { PrisonerVisitsAndVisitorsPermission } from '../../../../../../../types/public/permissions/domains/runningAPrison/prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'

export default function prisonerVisitsAndVisitorsReadCheck(request: PermissionsCheckRequest) {
  return baseCheckAndInUsersCaseLoad(PrisonerVisitsAndVisitorsPermission.read, request)
}
