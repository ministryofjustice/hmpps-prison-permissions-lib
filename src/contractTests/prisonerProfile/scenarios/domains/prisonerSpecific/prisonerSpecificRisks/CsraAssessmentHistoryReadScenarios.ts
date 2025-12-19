import { TestScenarios } from '../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../baseCheck/BaseCheckScenarios'
import { PermissionStatus } from '../../../../../../types/internal/permissions/PermissionStatus'
import { Role } from '../../../../../../types/internal/user/Role'

const deniedScenarios: TestScenarios = new TestScenarios([])
  .and(deniedBaseCheckScenarios)
  .and(grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionStatus.NOT_IN_CASELOAD))
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionStatus.NOT_IN_CASELOAD))
  .and(grantedRestrictedPatientCheckScenarios.withExpectedStatus(PermissionStatus.NOT_IN_CASELOAD))
  .and(
    grantedTransferringPrisonerCheckScenarios
      .withoutUserRoles([Role.GlobalSearch])
      .withExpectedStatus(PermissionStatus.PRISONER_IS_TRANSFERRING),
  )

const grantedScenarios = grantedCaseLoadCheckScenarios.and(
  grantedTransferringPrisonerCheckScenarios.withUserRole(Role.GlobalSearch),
)

// eslint-disable-next-line import/prefer-default-export
export const csraAssessmentHistoryReadScenarios = grantedScenarios.and(deniedScenarios)
