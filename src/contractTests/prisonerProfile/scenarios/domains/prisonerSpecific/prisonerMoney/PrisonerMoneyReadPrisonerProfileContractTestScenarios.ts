import { TestScenarios } from '../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../baseCheck/BaseCheckPrisonerProfileContractTestScenarios'
import { PermissionCheckStatus } from '../../../../../../types/permissions/PermissionCheckStatus'
import {
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
} from '../../../../../../services/permissions/checks/baseCheck/BaseCheckTestScenarios'

const deniedPrisonerMoneyReadScenarios: TestScenarios = deniedBaseCheckScenarios
  // These granted base check scenarios should be denied because the user must have the prisoner in case load:
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(grantedTransferringPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))

const grantedPrisonerMoneyReadScenarios = grantedCaseLoadCheckScenarios

// eslint-disable-next-line import/prefer-default-export
export const prisonerMoneyReadPrisonerProfileScenarios = grantedPrisonerMoneyReadScenarios.and(
  deniedPrisonerMoneyReadScenarios,
)
