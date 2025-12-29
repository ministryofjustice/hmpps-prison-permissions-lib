import { Role } from '../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../utils/PermissionCheckUtils'

const baseCheckAndUserHasSomeRolesFrom = (roles: Role[]) => matchBaseCheckAnd({ atLeastOneRoleRequiredFrom: roles })

export default baseCheckAndUserHasSomeRolesFrom
