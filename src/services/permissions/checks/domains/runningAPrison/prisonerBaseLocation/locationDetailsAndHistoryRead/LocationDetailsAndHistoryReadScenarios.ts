import { TestScenarios } from '../../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../../baseCheck/BaseCheckScenarios'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios.and(
  grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD),
)

const grantedScenarios = grantedRestrictedPatientCheckScenarios
  .and(grantedReleasedPrisonerCheckScenarios)
  .and(grantedTransferringPrisonerCheckScenarios)
  .and(grantedCaseLoadCheckScenarios)

// eslint-disable-next-line import/prefer-default-export
export const locationDetailsAndHistoryReadScenarios = grantedScenarios.and(deniedScenarios)
