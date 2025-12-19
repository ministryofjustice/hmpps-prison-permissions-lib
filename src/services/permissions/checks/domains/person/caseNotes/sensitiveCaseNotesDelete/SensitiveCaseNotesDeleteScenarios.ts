import {
  deniedCaseNotesReadAndEditScenarios,
  grantedCaseNotesReadAndEditScenarios,
} from '../CaseNotesReadAndEditScenarios'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'
import { Role } from '../../../../../../../types/internal/user/Role'

const deniedScenarios = deniedCaseNotesReadAndEditScenarios.and(
  grantedCaseNotesReadAndEditScenarios.withExpectedStatus(PermissionStatus.ROLE_NOT_PRESENT),
)

const grantedScenarios = grantedCaseNotesReadAndEditScenarios.withUserRole(Role.DeleteSensitiveCaseNotes)

// eslint-disable-next-line import/prefer-default-export
export const sensitiveCaseNotesDeleteScenarios = deniedScenarios.and(grantedScenarios)
