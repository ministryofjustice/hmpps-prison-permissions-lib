import PrisonerPermissionsContext from '../../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import inUsersCaseLoad from '../../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoad'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'

export default function prisonerVisitsAndVisitorsReadCheck(
  permission: PrisonerPermission,
  context: PrisonerPermissionsContext,
) {
  return inUsersCaseLoad(permission, context)
}
