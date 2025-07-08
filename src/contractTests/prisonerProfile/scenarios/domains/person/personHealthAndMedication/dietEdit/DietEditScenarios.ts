import { Role } from '../../../../../../../types/internal/user/Role'
import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../../../../../services/permissions/checks/baseCheck/BaseCheckScenarios'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios
  // These granted base check scenarios should be denied because the user must have the prisoner in the active case load:
  .and(
    grantedReleasedPrisonerCheckScenarios
      .withUserRole(Role.DietAndAllergiesEdit)
      .withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
  )
  .and(
    grantedTransferringPrisonerCheckScenarios
      .withUserRole(Role.DietAndAllergiesEdit)
      .withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
  )
  .and(
    grantedReleasedPrisonerCheckScenarios
      .withUserRole(Role.DietAndAllergiesEdit)
      .withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
  )
  .and(
    grantedGlobalSearchCheckScenarios
      .withUserRole(Role.DietAndAllergiesEdit)
      .withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withAdditionalCaseLoads(['LEI'])
      .withRoles([Role.DietAndAllergiesEdit])
      .accessingPrisonerAt('LEI')
      .expectsStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
  )
  // This granted base check scenario should be denied because the user doesn't have the required role:
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([])
      .accessingPrisonerAt('MDI')
      .expectsStatus(PermissionCheckStatus.ROLE_NOT_PRESENT),
  )

const grantedScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.DietAndAllergiesEdit])
    .accessingPrisonerAt('MDI')
    .expectsStatus(PermissionCheckStatus.OK),
])

// eslint-disable-next-line import/prefer-default-export
export const dietEditScenarios = grantedScenarios.and(deniedScenarios)
