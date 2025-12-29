import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { Role } from '../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../utils/PermissionCheckUtils'

const baseCheckAndUserHasSomeRolesFrom =
  (roles: Role[]) => (permission: PrisonerPermission, context: PrisonerPermissionsContext) => {
    return matchBaseCheckAnd(permission, context, { atLeastOneRoleRequiredFrom: roles })
  }

export default baseCheckAndUserHasSomeRolesFrom
