import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { Role } from '../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../utils/PermissionCheckUtils'

const baseCheckAndUserHasAllRoles =
  (roles: Role[]) => (permission: PrisonerPermission, context: PrisonerPermissionsContext) => {
    return matchBaseCheckAnd(permission, context, { allRolesRequired: roles })
  }

export default baseCheckAndUserHasAllRoles
