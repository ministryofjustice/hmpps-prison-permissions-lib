import { TestScenarios } from '../../../../../../testUtils/TestScenario'
import { Role } from '../../../../../../types/internal/user/Role'
import { PermissionStatus } from '../../../../../../types/internal/permissions/PermissionStatus'
import { grantedCaseNotesReadAndEditScenarios } from './CaseNotesReadAndEditScenarios'
import { deniedSensitiveCaseNotesBaseScenarios } from './SensitiveCaseNotesBaseScenarios'

const allPermissiveRoles = [Role.PomUser, Role.AddSensitiveCaseNotes]

const grantedScenarios = new TestScenarios([])
  .and(grantedCaseNotesReadAndEditScenarios.withUserRole(Role.PomUser).withExpectedStatus(PermissionStatus.OK))
  .and(
    grantedCaseNotesReadAndEditScenarios
      .withUserRole(Role.AddSensitiveCaseNotes)
      .withExpectedStatus(PermissionStatus.OK),
  )

// eslint-disable-next-line import/prefer-default-export
export const sensitiveCaseNotesEditScenarios = grantedScenarios.and(
  deniedSensitiveCaseNotesBaseScenarios(allPermissiveRoles),
)
