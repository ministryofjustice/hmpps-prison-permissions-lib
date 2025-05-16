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
import { Role } from '../../../../../../../types/internal/user/Role'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios
  // These granted base check scenarios should be denied without extra role present:
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(grantedRestrictedPatientCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))

const grantedScenarios = grantedCaseLoadCheckScenarios
  .and(grantedGlobalSearchCheckScenarios.withUserRoles([Role.GlobalSearch]))
  .and(grantedReleasedPrisonerCheckScenarios.withUserRoles([Role.GlobalSearch]))
  .and(grantedTransferringPrisonerCheckScenarios.withUserRoles([Role.GlobalSearch]))
  .and(grantedRestrictedPatientCheckScenarios.withUserRoles([Role.GlobalSearch]))

// eslint-disable-next-line import/prefer-default-export
export const prisonerIncentivesReadScenarios = grantedScenarios.and(deniedScenarios)
