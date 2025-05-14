import { TestScenarios } from '../../../../../testUtils/TestScenario'
import { deniedBaseCheckScenarios, grantedBaseCheckScenarios } from '../../baseCheck/BaseCheckTestScenarios'
import { Role } from '../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'

export default function baseCheckAndUserHasAllRolesScenarios(roles: Role[]) {
  const deniedScenarios: TestScenarios = grantedBaseCheckScenarios
    .withoutUserRoles(roles)
    .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT)
    .and(deniedBaseCheckScenarios.withUserRoles(roles))

  const grantedScenarios = grantedBaseCheckScenarios.withUserRoles(roles).withExpectedStatus(PermissionCheckStatus.OK)

  return grantedScenarios.and(deniedScenarios)
}
