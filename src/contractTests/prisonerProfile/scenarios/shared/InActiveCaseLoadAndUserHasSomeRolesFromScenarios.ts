import { Role } from '../../../../types/internal/user/Role'
import { TestScenarios, userWithActiveCaseLoad } from '../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../baseCheck/BaseCheckScenarios'
import { PermissionCheckStatus } from '../../../../types/internal/permissions/PermissionCheckStatus'

export default function inActiveCaseLoadAndUserHasSomeRolesFromScenarios(roles: Role[]) {
  const deniedScenarios: TestScenarios = deniedBaseCheckScenarios
    // These granted base check scenarios should be denied because the user must have the prisoner in the active case load:
    .and(
      grantedReleasedPrisonerCheckScenarios
        .withUserRoles(roles)
        .withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
    )
    .and(
      grantedTransferringPrisonerCheckScenarios
        .withUserRoles(roles)
        .withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
    )
    .and(
      grantedReleasedPrisonerCheckScenarios
        .withUserRoles(roles)
        .withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
    )
    .and(
      grantedGlobalSearchCheckScenarios
        .withUserRoles(roles)
        .withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
    )
    .andScenarioWhere(
      userWithActiveCaseLoad('MDI')
        .withAdditionalCaseLoads(['LEI'])
        .withRoles(roles)
        .accessingPrisonerAt('LEI')
        .expectsStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
    )

  const grantedScenarios = roles.reduce(
    (scenarios, role) =>
      scenarios.andScenarioWhere(
        userWithActiveCaseLoad('MDI')
          .withRoles([role])
          .accessingPrisonerAt('MDI')
          .expectsStatus(PermissionCheckStatus.OK),
      ),
    new TestScenarios([]),
  )

  return grantedScenarios.and(deniedScenarios).andScenarioWhere(
    // Dependent on whether a role is required:
    userWithActiveCaseLoad('MDI')
      .withRoles([])
      .accessingPrisonerAt('MDI')
      .expectsStatus(roles.length === 0 ? PermissionCheckStatus.OK : PermissionCheckStatus.ROLE_NOT_PRESENT),
  )
}
