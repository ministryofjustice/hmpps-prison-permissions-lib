import { Role } from '../../../../../../../types/internal/user/Role'
import { grantedCaseNotesReadAndEditScenarios } from '../CaseNotesReadAndEditScenarios'
import { deniedSensitiveCaseNotesBaseScenarios } from '../../../../../../../contractTests/prisonerProfile/scenarios/domains/person/caseNotes/SensitiveCaseNotesBaseScenarios'
import { TestScenarios } from '../../../../../../../testUtils/TestScenario'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'

const allPermissiveRoles = [Role.PomUser, Role.ViewSensitiveCaseNotes, Role.AddSensitiveCaseNotes]

const grantedScenarios = new TestScenarios([])
  .and(grantedCaseNotesReadAndEditScenarios.withUserRole(Role.PomUser).withExpectedStatus(PermissionStatus.OK))
  .and(
    grantedCaseNotesReadAndEditScenarios
      .withUserRole(Role.ViewSensitiveCaseNotes)
      .withExpectedStatus(PermissionStatus.OK),
  )
  .and(
    grantedCaseNotesReadAndEditScenarios
      .withUserRole(Role.AddSensitiveCaseNotes)
      .withExpectedStatus(PermissionStatus.OK),
  )

// eslint-disable-next-line import/prefer-default-export
export const sensitiveCaseNotesReadScenarios = grantedScenarios.and(
  deniedSensitiveCaseNotesBaseScenarios(allPermissiveRoles),
)
