import { Role } from '../../../../types/internal/user/Role'
import inUsersCaseLoadAndUserHasSomeRolesFromScenarios from './InUsersCaseLoadAndUserHasSomeRolesFromScenarios'

export default function inUsersCaseLoadAndUserHasRoleScenarios(role: Role) {
  return inUsersCaseLoadAndUserHasSomeRolesFromScenarios([role])
}
