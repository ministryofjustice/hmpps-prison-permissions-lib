import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../testUtils/TestScenario'
import {
  grantedCaseLoadCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
} from '../../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../../types/internal/user/Role'
import { PermissionStatus } from '../../../../../../types/internal/permissions/PermissionStatus'
import {
  deniedCaseNotesReadAndEditScenarios,
  grantedCaseNotesReadAndEditAfterTransferScenarios,
  grantedCaseNotesReadAndEditTransferringPrisonerScenarios,
} from './CaseNotesReadAndEditScenarios'

// eslint-disable-next-line import/prefer-default-export
export function deniedSensitiveCaseNotesBaseScenarios(allPermissiveRoles: Role[]): TestScenarios {
  return new TestScenarios([])
    .and(
      grantedRestrictedPatientCheckScenarios
        .withoutUserRoles([...allPermissiveRoles, Role.InactiveBookings])
        .withExpectedStatus(PermissionStatus.RESTRICTED_PATIENT),
    )
    .andScenarioWhere(
      userWithActiveCaseLoad('MDI')
        .withRoles([Role.InactiveBookings])
        .accessingRestrictedPatientSupportedBy('MDI')
        .expectsStatus(PermissionStatus.ROLE_NOT_PRESENT),
    )
    .andScenarioWhere(
      userWithActiveCaseLoad('MDI')
        .withRoles([Role.InactiveBookings])
        .accessingRestrictedPatientSupportedBy('LEI')
        .expectsStatus(PermissionStatus.ROLE_NOT_PRESENT),
    )
    .and(
      grantedCaseNotesReadAndEditAfterTransferScenarios
        .withoutUserRoles(allPermissiveRoles)
        .withExpectedStatus(PermissionStatus.ROLE_NOT_PRESENT),
    )
    .and(
      grantedCaseNotesReadAndEditTransferringPrisonerScenarios
        .withoutUserRoles(allPermissiveRoles)
        .withExpectedStatus(PermissionStatus.ROLE_NOT_PRESENT),
    )
    .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionStatus.ROLE_NOT_PRESENT))
    .and(grantedCaseLoadCheckScenarios.withExpectedStatus(PermissionStatus.ROLE_NOT_PRESENT))
    .and(deniedCaseNotesReadAndEditScenarios.withUserRoles(allPermissiveRoles.filter(role => role !== Role.PomUser)))
}
