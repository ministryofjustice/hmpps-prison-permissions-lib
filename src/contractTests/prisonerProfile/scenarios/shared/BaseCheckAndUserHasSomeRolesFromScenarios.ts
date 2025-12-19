import { Role } from '../../../../types/internal/user/Role'
import { TestScenarios } from '../../../../testUtils/TestScenario'
import { deniedBaseCheckScenarios, grantedBaseCheckScenarios } from '../baseCheck/BaseCheckScenarios'
import { PermissionStatus } from '../../../../types/internal/permissions/PermissionStatus'

export default function baseCheckAndUserHasSomeRolesFromScenarios(roles: Role[]) {
  const deniedScenarios: TestScenarios = grantedBaseCheckScenarios
    .withoutUserRoles(roles)
    .withExpectedStatus(PermissionStatus.ROLE_NOT_PRESENT)
    .and(deniedBaseCheckScenarios.withUserRoles(roles))

  const grantedScenarios = roles.reduce(
    (scenarios, role) =>
      scenarios.and(grantedBaseCheckScenarios.withUserRoles([role]).withExpectedStatus(PermissionStatus.OK)),
    new TestScenarios([]),
  )

  return grantedScenarios.and(deniedScenarios)
}
