import baseCheckAndUserHasAllRolesScenarios from './BaseCheckAndUserHasAllRolesScenarios'
import { Role } from '../../../../types/user/Role'

export default function baseCheckAndUserHasRoleScenarios(role: Role) {
  return baseCheckAndUserHasAllRolesScenarios([role])
}
