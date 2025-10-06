import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../testUtils/TestScenario'
import {
  grantedCaseLoadCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
} from '../../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../../types/internal/permissions/PermissionCheckStatus'
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
        .withExpectedStatus(PermissionCheckStatus.RESTRICTED_PATIENT),
    )
    .andScenarioWhere(
      userWithActiveCaseLoad('MDI')
        .withRoles([Role.InactiveBookings])
        .accessingRestrictedPatientSupportedBy('MDI')
        .expectsStatus(PermissionCheckStatus.ROLE_NOT_PRESENT),
    )
    .andScenarioWhere(
      userWithActiveCaseLoad('MDI')
        .withRoles([Role.InactiveBookings])
        .accessingRestrictedPatientSupportedBy('LEI')
        .expectsStatus(PermissionCheckStatus.ROLE_NOT_PRESENT),
    )
    .and(
      grantedCaseNotesReadAndEditAfterTransferScenarios
        .withoutUserRoles(allPermissiveRoles)
        .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT),
    )
    .and(
      grantedCaseNotesReadAndEditTransferringPrisonerScenarios
        .withoutUserRoles(allPermissiveRoles)
        .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT),
    )
    .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT))
    .and(grantedCaseLoadCheckScenarios.withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT))
    .and(deniedCaseNotesReadAndEditScenarios.withUserRoles(allPermissiveRoles.filter(role => role !== Role.PomUser)))
}
