import {
  deniedCaseNotesReadAndEditScenarios,
  grantedCaseNotesReadAndEditScenarios,
} from '../CaseNotesReadAndEditScenarios'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { Role } from '../../../../../../../types/internal/user/Role'

const deniedScenarios = deniedCaseNotesReadAndEditScenarios(PermissionCheckStatus.ROLE_NOT_PRESENT).and(
  grantedCaseNotesReadAndEditScenarios.withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT),
)

const grantedScenarios = grantedCaseNotesReadAndEditScenarios.withUserRole(Role.DeleteSensitiveCaseNotes)

// eslint-disable-next-line import/prefer-default-export
export const sensitiveCaseNotesDeleteScenarios = deniedScenarios.and(grantedScenarios)
