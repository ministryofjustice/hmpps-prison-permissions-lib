import { Role } from '../../../../../types/internal/user/Role'
import baseCheckAndUserHasAllRoles from '../baseCheckAndUserHasAllRoles/BaseCheckAndUserHasAllRoles'

const baseCheckAndUserHasRole = (role: Role) => baseCheckAndUserHasAllRoles([role])

export default baseCheckAndUserHasRole
