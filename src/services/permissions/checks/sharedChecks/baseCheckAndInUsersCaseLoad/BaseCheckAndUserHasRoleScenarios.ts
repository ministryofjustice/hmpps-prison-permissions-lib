import { TestScenarios } from '../../../../../testUtils/TestScenario'
import { deniedBaseCheckScenarios, grantedBaseCheckScenarios } from '../../baseCheck/BaseCheckTestScenarios'
import { Role } from '../../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../../types/permissions/PermissionCheckStatus'

export default function baseCheckAndUserHasRoleScenarios(role: Role) {
  const deniedScenarios: TestScenarios = grantedBaseCheckScenarios
    .withoutUserRoles([role])
    .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT)
    .and(deniedBaseCheckScenarios.withUserRoles([role]))

  const grantedScenarios = grantedBaseCheckScenarios.withUserRoles([role]).withExpectedStatus(PermissionCheckStatus.OK)

  return grantedScenarios.and(deniedScenarios)
}
