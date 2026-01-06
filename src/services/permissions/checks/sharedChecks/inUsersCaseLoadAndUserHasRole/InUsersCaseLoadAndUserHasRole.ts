import { Role } from '../../../../../types/internal/user/Role'
import inUsersCaseLoadAndUserHasSomeRolesFrom from '../inUsersCaseLoadAndUserHasSomeRolesFrom/InUsersCaseLoadAndUserHasSomeRolesFrom'

const inUsersCaseLoadAndUserHasRole = (role: Role) => inUsersCaseLoadAndUserHasSomeRolesFrom([role])

export default inUsersCaseLoadAndUserHasRole
