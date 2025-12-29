import inActiveCaseLoad from '../inActiveCaseLoad/InActiveCaseLoad'
import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'

export default function prisonerProfileEditCheck(permission: PrisonerPermission, context: PrisonerPermissionsContext) {
  return inActiveCaseLoad(permission, context)
}
