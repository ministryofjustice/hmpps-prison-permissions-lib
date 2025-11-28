import { TestScenarios } from '../../../../../../../testUtils/TestScenario'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../../baseCheck/BaseCheckScenarios'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios.and(
  grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD),
)

const grantedScenarios = new TestScenarios([])
  .and(grantedRestrictedPatientCheckScenarios)
  .and(grantedReleasedPrisonerCheckScenarios)
  .and(grantedTransferringPrisonerCheckScenarios)
  .and(grantedCaseLoadCheckScenarios)

// eslint-disable-next-line import/prefer-default-export
export const incentiveLevelHistoryReadScenarios = grantedScenarios.and(deniedScenarios)
