import { TestScenarios } from '../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../baseCheck/BaseCheckScenarios'
import { PermissionStatus } from '../../../../../types/internal/permissions/PermissionStatus'
import { Role } from '../../../../../types/internal/user/Role'

export default function inUsersCaseLoadAndUserHasSomeRolesFromScenarios(roles: Role[]) {
  const deniedScenarios: TestScenarios = deniedBaseCheckScenarios
    // These granted base check scenarios should be denied because the user must have the prisoner in the active case load:
    .and(
      grantedReleasedPrisonerCheckScenarios.withUserRoles(roles).withExpectedStatus(PermissionStatus.NOT_IN_CASELOAD),
    )
    .and(
      grantedTransferringPrisonerCheckScenarios
        .withUserRoles(roles)
        .withExpectedStatus(PermissionStatus.NOT_IN_CASELOAD),
    )
    .and(
      grantedReleasedPrisonerCheckScenarios.withUserRoles(roles).withExpectedStatus(PermissionStatus.NOT_IN_CASELOAD),
    )
    .and(grantedGlobalSearchCheckScenarios.withUserRoles(roles).withExpectedStatus(PermissionStatus.NOT_IN_CASELOAD))
    .and(grantedCaseLoadCheckScenarios.withoutUserRoles(roles).withExpectedStatus(PermissionStatus.ROLE_NOT_PRESENT))

  const grantedScenarios = roles.reduce(
    (scenarios, role) =>
      scenarios.and(grantedCaseLoadCheckScenarios.withUserRoles([role]).withExpectedStatus(PermissionStatus.OK)),
    new TestScenarios([]),
  )

  return grantedScenarios.and(deniedScenarios).and(
    // Dependent on whether a role is required:
    grantedCaseLoadCheckScenarios
      .withoutUserRoles(roles)
      .withExpectedStatus(roles.length === 0 ? PermissionStatus.OK : PermissionStatus.ROLE_NOT_PRESENT),
  )
}
