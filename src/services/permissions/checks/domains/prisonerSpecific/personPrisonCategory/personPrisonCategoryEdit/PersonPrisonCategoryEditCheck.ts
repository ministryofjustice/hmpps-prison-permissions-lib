import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { logDeniedPermissionCheck, userHasSomeRolesFrom } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PersonPrisonCategoryPermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/personPrisonCategory/PersonPrisonCategoryPermissions'

const permission = PersonPrisonCategoryPermission.edit

export default function personPrisonCategoryEditCheck(request: PermissionsCheckRequest) {
  const { user, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const check =
    baseCheckPassed &&
    userHasSomeRolesFrom(
      [Role.CreateCategorisation, Role.CreateRecategorisation, Role.ApproveCategorisation, Role.CategorisationSecurity],
      user,
    )

  if (!check) logDeniedPermissionCheck(permission, request, PermissionCheckStatus.ROLE_NOT_PRESENT)

  return check
}
