import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../baseCheck/BaseCheckPrisonerProfileContractTestScenarios'
import { PermissionCheckStatus } from '../../../../../../types/permissions/PermissionCheckStatus'
import { Role } from '../../../../../../types/user/Role'

const deniedPrisonerMoneyReadScenarios: TestScenarios = deniedBaseCheckScenarios
  // These granted base check scenarios should because the user must have the prisoner in case load:
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(grantedTransferringPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch])
      .accessingPrisonerAt('LEI')
      .expectsStatus(PermissionCheckStatus.NOT_IN_CASELOAD),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch, Role.PomUser])
      .accessingPrisonerAt('LEI')
      .expectsStatus(PermissionCheckStatus.NOT_IN_CASELOAD),
  )

const grantedPrisonerMoneyReadScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI').withRoles([]).accessingPrisonerAt('MDI').expectsStatus(PermissionCheckStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withAdditionalCaseLoads(['LEI'])
    .withRoles([])
    .accessingPrisonerAt('LEI')
    .expectsStatus(PermissionCheckStatus.OK),
])

// eslint-disable-next-line import/prefer-default-export
export const prisonerMoneyReadPrisonerProfileScenarios = grantedPrisonerMoneyReadScenarios.and(
  deniedPrisonerMoneyReadScenarios,
)
