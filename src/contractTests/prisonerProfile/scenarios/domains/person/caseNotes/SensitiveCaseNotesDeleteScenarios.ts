import { Role } from '../../../../../../types/internal/user/Role'
import { grantedCaseNotesReadAndEditScenarios } from './CaseNotesReadAndEditScenarios'
import { TestScenarios } from '../../../../../../testUtils/TestScenario'
import { PermissionStatus } from '../../../../../../types/internal/permissions/PermissionStatus'
import { deniedCaseLoadCheckScenarios } from '../../../baseCheck/BaseCheckScenarios'

const deniedScenarios: TestScenarios = new TestScenarios([])
  .and(grantedCaseNotesReadAndEditScenarios.withExpectedStatus(PermissionStatus.ROLE_NOT_PRESENT))
  .and(deniedCaseLoadCheckScenarios.withUserRole(Role.DeleteSensitiveCaseNotes))

const grantedScenarios = new TestScenarios([]).and(
  grantedCaseNotesReadAndEditScenarios
    .withUserRole(Role.DeleteSensitiveCaseNotes)
    .withExpectedStatus(PermissionStatus.OK),
)

// eslint-disable-next-line import/prefer-default-export
export const sensitiveCaseNotesDeleteScenarios = deniedScenarios.and(grantedScenarios)
