import { Role } from '../../../../../../../types/internal/user/Role'
import PrisonerPermissionsContext from '../../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import baseCheckAndUserHasRole from '../../../../sharedChecks/baseCheckAndUserHasRole/BaseCheckAndUserHasRole'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'

export default function sentenceCalculationReadCheck(
  permission: PrisonerPermission,
  context: PrisonerPermissionsContext,
) {
  return baseCheckAndUserHasRole(Role.ReleaseDatesCalculator)(permission, context)
}
