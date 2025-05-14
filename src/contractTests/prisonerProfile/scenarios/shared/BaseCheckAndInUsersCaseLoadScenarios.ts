import { TestScenarios } from '../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../baseCheck/BaseCheckScenarios'
import { PermissionCheckStatus } from '../../../../types/internal/permissions/PermissionCheckStatus'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios
  // These granted base check scenarios should be denied because the user must have the prisoner in case load:
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(grantedTransferringPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))

const grantedScenarios = grantedCaseLoadCheckScenarios

// eslint-disable-next-line import/prefer-default-export
export const baseCheckAndInUsersCaseLoadScenarios = grantedScenarios.and(deniedScenarios)
