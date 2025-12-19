import { TestScenarios } from '../../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../../baseCheck/BaseCheckScenarios'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios.and(
  grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionStatus.NOT_IN_CASELOAD),
)

const grantedScenarios = grantedRestrictedPatientCheckScenarios
  .and(grantedReleasedPrisonerCheckScenarios)
  .and(grantedTransferringPrisonerCheckScenarios)
  .and(grantedCaseLoadCheckScenarios)

// eslint-disable-next-line import/prefer-default-export
export const locationDetailsAndHistoryReadScenarios = grantedScenarios.and(deniedScenarios)
