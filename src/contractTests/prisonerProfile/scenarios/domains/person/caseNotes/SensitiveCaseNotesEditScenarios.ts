import { TestScenarios } from '../../../../../../testUtils/TestScenario'
import { Role } from '../../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../../types/internal/permissions/PermissionCheckStatus'
import { grantedCaseNotesReadAndEditScenarios } from './CaseNotesReadAndEditScenarios'
import { deniedSensitiveCaseNotesBaseScenarios } from './SensitiveCaseNotesBaseScenarios'

const allPermissiveRoles = [Role.PomUser, Role.AddSensitiveCaseNotes]

const grantedScenarios = new TestScenarios([])
  .and(grantedCaseNotesReadAndEditScenarios.withUserRole(Role.PomUser).withExpectedStatus(PermissionCheckStatus.OK))
  .and(
    grantedCaseNotesReadAndEditScenarios
      .withUserRole(Role.AddSensitiveCaseNotes)
      .withExpectedStatus(PermissionCheckStatus.OK),
  )

export const sensitiveCaseNotesEditScenarios = grantedScenarios.and(
  deniedSensitiveCaseNotesBaseScenarios(allPermissiveRoles),
)
