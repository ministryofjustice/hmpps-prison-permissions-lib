import { TestScenarios } from '../../../../../../testUtils/TestScenario'
import { Role } from '../../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../../types/internal/permissions/PermissionCheckStatus'
import { grantedCaseNotesReadAndEditScenarios } from './CaseNotesReadAndEditScenarios'
import { deniedSensitiveCaseNotesBaseScenarios } from './SensitiveCaseNotesBaseScenarios'

const allPermissiveRoles = [Role.PomUser, Role.ViewSensitiveCaseNotes, Role.AddSensitiveCaseNotes]

const grantedScenarios = new TestScenarios([])
  .and(grantedCaseNotesReadAndEditScenarios.withUserRole(Role.PomUser).withExpectedStatus(PermissionCheckStatus.OK))
  .and(
    grantedCaseNotesReadAndEditScenarios
      .withUserRole(Role.ViewSensitiveCaseNotes)
      .withExpectedStatus(PermissionCheckStatus.OK),
  )
  .and(
    grantedCaseNotesReadAndEditScenarios
      .withUserRole(Role.AddSensitiveCaseNotes)
      .withExpectedStatus(PermissionCheckStatus.OK),
  )

// eslint-disable-next-line import/prefer-default-export
export const sensitiveCaseNotesReadScenarios = grantedScenarios.and(
  deniedSensitiveCaseNotesBaseScenarios(allPermissiveRoles),
)
