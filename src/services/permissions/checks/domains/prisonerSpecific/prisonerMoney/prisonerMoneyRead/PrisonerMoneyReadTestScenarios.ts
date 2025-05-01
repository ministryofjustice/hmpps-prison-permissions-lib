import { TestScenarios } from '../../../../../../../testUtils/TestScenario'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../../baseCheck/BaseCheckTestScenarios'

const deniedPrisonerMoneyReadScenarios: TestScenarios = deniedBaseCheckScenarios
  // These granted base check scenarios should be denied because the user must have the prisoner in case load:
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(grantedTransferringPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))

const grantedPrisonerMoneyReadScenarios = grantedCaseLoadCheckScenarios

// eslint-disable-next-line import/prefer-default-export
export const prisonerMoneyReadScenarios = grantedPrisonerMoneyReadScenarios.and(deniedPrisonerMoneyReadScenarios)
