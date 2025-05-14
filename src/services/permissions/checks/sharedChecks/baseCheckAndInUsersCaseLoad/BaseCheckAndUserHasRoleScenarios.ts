import { Role } from '../../../../../types/internal/user/Role'
import baseCheckAndUserHasAllRolesScenarios from './BaseCheckAndUserHasAllRolesScenarios'

export default function baseCheckAndUserHasRoleScenarios(role: Role) {
  return baseCheckAndUserHasAllRolesScenarios([role])
}
