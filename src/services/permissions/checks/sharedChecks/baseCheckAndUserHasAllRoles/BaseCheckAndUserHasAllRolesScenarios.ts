import { TestScenarios } from '../../../../../testUtils/TestScenario'
import { deniedBaseCheckScenarios, grantedBaseCheckScenarios } from '../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../types/internal/user/Role'
import { PermissionStatus } from '../../../../../types/internal/permissions/PermissionStatus'

export default function baseCheckAndUserHasAllRolesScenarios(roles: Role[]) {
  const deniedScenarios: TestScenarios = grantedBaseCheckScenarios
    .withoutUserRoles(roles)
    .withExpectedStatus(PermissionStatus.ROLE_NOT_PRESENT)
    .and(deniedBaseCheckScenarios.withUserRoles(roles))

  const grantedScenarios = grantedBaseCheckScenarios.withUserRoles(roles).withExpectedStatus(PermissionStatus.OK)

  return grantedScenarios.and(deniedScenarios)
}
