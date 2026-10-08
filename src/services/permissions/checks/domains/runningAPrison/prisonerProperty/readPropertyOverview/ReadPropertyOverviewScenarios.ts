import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../../baseCheck/BaseCheckScenarios'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { Role } from '../../../../../../../types/internal/user/Role'

const grantedScenarios: TestScenarios = grantedCaseLoadCheckScenarios
  .and(grantedGlobalSearchCheckScenarios)
  .and(grantedReleasedPrisonerCheckScenarios)
  .and(grantedTransferringPrisonerCheckScenarios)
  // Access to restricted patient property overview granted only by the Inactive Bookings role:
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.InactiveBookings])
      .accessingRestrictedPatientSupportedBy('MDI')
      .expectsStatus(PermissionCheckStatus.OK),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.InactiveBookings])
      .accessingRestrictedPatientSupportedBy('LEI')
      .expectsStatus(PermissionCheckStatus.OK),
  )

export const deniedReadPropertyOverviewScenarios: TestScenarios = deniedBaseCheckScenarios.and(
  // Access to restricted patient property overview denied without the Inactive Bookings role:
  grantedRestrictedPatientCheckScenarios
    .withoutUserRoles([Role.InactiveBookings])
    .withExpectedStatus(PermissionCheckStatus.RESTRICTED_PATIENT),
)

export const readPropertyOverviewScenarios = grantedScenarios.and(deniedReadPropertyOverviewScenarios)
