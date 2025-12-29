import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { Role } from '../../../../../types/internal/user/Role'
import baseCheckAndUserHasAllRoles from '../baseCheckAndUserHasAllRoles/BaseCheckAndUserHasAllRoles'

const baseCheckAndUserHasRole =
  (role: Role) => (permission: PrisonerPermission, context: PrisonerPermissionsContext) => {
    return baseCheckAndUserHasAllRoles([role])(permission, context)
  }

export default baseCheckAndUserHasRole
