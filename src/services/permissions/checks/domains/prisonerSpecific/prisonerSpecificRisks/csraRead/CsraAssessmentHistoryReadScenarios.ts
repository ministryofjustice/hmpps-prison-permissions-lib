import { Role } from '../../../../../../../types/internal/user/Role'
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

const deniedScenarios: TestScenarios = new TestScenarios([])
  .and(deniedBaseCheckScenarios)
  .and(grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(grantedRestrictedPatientCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(
    grantedTransferringPrisonerCheckScenarios
      .withoutUserRoles([Role.GlobalSearch])
      .withExpectedStatus(PermissionCheckStatus.PRISONER_IS_TRANSFERRING),
  )

const grantedScenarios = grantedCaseLoadCheckScenarios.and(
  grantedTransferringPrisonerCheckScenarios.withUserRole(Role.GlobalSearch),
)

// eslint-disable-next-line import/prefer-default-export
export const csraAssessmentHistoryReadScenarios = grantedScenarios.and(deniedScenarios)
