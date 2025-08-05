import { Role } from '../../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasSomeRolesFromScenarios from '../inActiveCaseLoadAndUserHasSomeRolesFrom/InActiveCaseLoadAndUserHasSomeRolesFromScenarios'

export default function inActiveCaseLoadAndUserHasRoleScenarios(role: Role) {
  return inActiveCaseLoadAndUserHasSomeRolesFromScenarios([role])
}
