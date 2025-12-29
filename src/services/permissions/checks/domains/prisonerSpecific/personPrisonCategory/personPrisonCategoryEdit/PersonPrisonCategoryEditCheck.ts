import PrisonerPermissionsContext from '../../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'

export default function personPrisonCategoryEditCheck(
  permission: PrisonerPermission,
  context: PrisonerPermissionsContext,
) {
  return baseCheckAndUserHasSomeRolesFrom([
    Role.CreateCategorisation,
    Role.CreateRecategorisation,
    Role.ApproveCategorisation,
    Role.CategorisationSecurity,
  ])(permission, context)
}
