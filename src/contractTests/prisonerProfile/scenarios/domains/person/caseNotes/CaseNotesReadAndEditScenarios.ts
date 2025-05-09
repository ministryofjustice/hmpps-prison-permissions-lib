import { TestScenarios } from '../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../../../types/permissions/PermissionCheckStatus'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios.and(
  grantedGlobalSearchCheckScenarios
    .withoutUserRoles([Role.PomUser])
    .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT),
)

const grantedScenarios = grantedRestrictedPatientCheckScenarios
  .and(grantedReleasedPrisonerCheckScenarios)
  .and(grantedTransferringPrisonerCheckScenarios)
  .and(grantedCaseLoadCheckScenarios)
  .and(grantedGlobalSearchCheckScenarios.withUserRole(Role.PomUser))

// eslint-disable-next-line import/prefer-default-export
export const caseNotesReadAndEditScenarios = grantedScenarios.and(deniedScenarios)
