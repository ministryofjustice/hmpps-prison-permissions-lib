import baseCheckAndUserHasAllRolesScenarios from './BaseCheckAndUserHasAllRolesScenarios'
import { Role } from '../../../../types/internal/user/Role'

export default function baseCheckAndUserHasRoleScenarios(role: Role) {
  return baseCheckAndUserHasAllRolesScenarios([role])
}
