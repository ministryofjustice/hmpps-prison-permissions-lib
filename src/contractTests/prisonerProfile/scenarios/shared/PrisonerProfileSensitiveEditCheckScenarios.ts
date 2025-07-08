import { TestScenarios, userWithActiveCaseLoad } from '../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../types/internal/permissions/PermissionCheckStatus'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios
  // These granted base check scenarios should be denied because the user must have the prisoner in the active case load:
  .and(
    grantedReleasedPrisonerCheckScenarios
      .withUserRole(Role.PrisonerProfileSensitiveEdit)
      .withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
  )
  .and(
    grantedTransferringPrisonerCheckScenarios
      .withUserRole(Role.PrisonerProfileSensitiveEdit)
      .withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
  )
  .and(
    grantedReleasedPrisonerCheckScenarios
      .withUserRole(Role.PrisonerProfileSensitiveEdit)
      .withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
  )
  .and(
    grantedGlobalSearchCheckScenarios
      .withUserRole(Role.PrisonerProfileSensitiveEdit)
      .withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withAdditionalCaseLoads(['LEI'])
      .withRoles([])
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
    .withRoles([Role.PrisonerProfileSensitiveEdit])
    .accessingPrisonerAt('MDI')
    .expectsStatus(PermissionCheckStatus.OK),
])

// eslint-disable-next-line import/prefer-default-export
export const prisonerProfileSensitiveEditCheckScenarios = grantedScenarios.and(deniedScenarios)
