import { TestScenarios, userWithActiveCaseLoad } from '../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../baseCheck/BaseCheckScenarios'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios
  // These granted base check scenarios should be denied because the user must have the prisoner in their active case load:
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD))
  .and(grantedTransferringPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD))
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD))
  .and(grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD))
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withAdditionalCaseLoads(['LEI'])
      .withRoles([])
      .accessingPrisonerAt('LEI')
      .expectsStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
  )

const grantedScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI').withRoles([]).accessingPrisonerAt('MDI').expectsStatus(PermissionCheckStatus.OK),
])

// eslint-disable-next-line import/prefer-default-export
export const baseCheckAndInActiveCaseLoadScenarios = grantedScenarios.and(deniedScenarios)
