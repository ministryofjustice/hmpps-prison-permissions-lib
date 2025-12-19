import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import inUsersCaseLoad from '../../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoad'
import { PrisonerVisitsAndVisitorsPermission } from '../../../../../../../types/public/permissions/domains/runningAPrison/prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'

export default function prisonerVisitsAndVisitorsReadCheck(context: PermissionsCheckContext) {
  return inUsersCaseLoad(PrisonerVisitsAndVisitorsPermission.read, context)
}
