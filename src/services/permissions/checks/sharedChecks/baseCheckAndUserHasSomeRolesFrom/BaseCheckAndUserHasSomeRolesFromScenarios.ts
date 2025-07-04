import { TestScenarios } from '../../../../../testUtils/TestScenario'
import { deniedBaseCheckScenarios, grantedBaseCheckScenarios } from '../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'

export default function baseCheckAndUserHasSomeRolesFromScenarios(roles: Role[]) {
  const deniedScenarios: TestScenarios = grantedBaseCheckScenarios
    .withoutUserRoles(roles)
    .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT)
    .and(deniedBaseCheckScenarios.withUserRoles(roles))

  const grantedScenarios = roles.reduce(
    (scenarios, role) =>
      scenarios.and(grantedBaseCheckScenarios.withUserRoles([role]).withExpectedStatus(PermissionCheckStatus.OK)),
    new TestScenarios([]),
  )

  return grantedScenarios.and(deniedScenarios)
}
