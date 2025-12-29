import { Role } from '../../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasSomeRolesFrom from '../inActiveCaseLoadAndUserHasSomeRolesFrom/InActiveCaseLoadAndUserHasSomeRolesFrom'

const inActiveCaseLoadAndUserHasRole = (role: Role) => inActiveCaseLoadAndUserHasSomeRolesFrom([role])

export default inActiveCaseLoadAndUserHasRole
