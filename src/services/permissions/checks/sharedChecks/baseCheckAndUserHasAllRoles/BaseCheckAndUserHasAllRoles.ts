import { Role } from '../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../utils/PermissionCheckUtils'

const baseCheckAndUserHasAllRoles = (roles: Role[]) => matchBaseCheckAnd({ allRolesRequired: roles })

export default baseCheckAndUserHasAllRoles
