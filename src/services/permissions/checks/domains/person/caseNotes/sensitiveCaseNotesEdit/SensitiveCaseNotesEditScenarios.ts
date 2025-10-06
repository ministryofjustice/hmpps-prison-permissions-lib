import { Role } from '../../../../../../../types/internal/user/Role'
import { grantedCaseNotesReadAndEditScenarios } from '../CaseNotesReadAndEditScenarios'
import { deniedSensitiveCaseNotesBaseScenarios } from '../../../../../../../contractTests/prisonerProfile/scenarios/domains/person/caseNotes/SensitiveCaseNotesBaseScenarios'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { TestScenarios } from '../../../../../../../testUtils/TestScenario'

const allPermissiveRoles = [Role.PomUser, Role.AddSensitiveCaseNotes]

const grantedScenarios = new TestScenarios([])
  .and(grantedCaseNotesReadAndEditScenarios.withUserRole(Role.PomUser).withExpectedStatus(PermissionCheckStatus.OK))
  .and(
    grantedCaseNotesReadAndEditScenarios
      .withUserRole(Role.AddSensitiveCaseNotes)
      .withExpectedStatus(PermissionCheckStatus.OK),
  )

// eslint-disable-next-line import/prefer-default-export
export const sensitiveCaseNotesEditScenarios = grantedScenarios.and(
  deniedSensitiveCaseNotesBaseScenarios(allPermissiveRoles),
)
