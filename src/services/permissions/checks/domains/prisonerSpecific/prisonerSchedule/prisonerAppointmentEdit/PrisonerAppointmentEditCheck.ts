import PrisonerPermissionsContext from '../../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import inActiveCaseLoad from '../../../../sharedChecks/inActiveCaseLoad/InActiveCaseLoad'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'

export default function prisonerAppointmentEditCheck(
  permission: PrisonerPermission,
  context: PrisonerPermissionsContext,
) {
  return inActiveCaseLoad(permission, context)
}
