import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
} from '../../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../../types/internal/permissions/PermissionCheckStatus'

const grantedScenarios: TestScenarios = grantedCaseLoadCheckScenarios
  .and(grantedGlobalSearchCheckScenarios)
  .and(grantedReleasedPrisonerCheckScenarios)
  // Access to transferring prisoner property overview granted only by the Inactive Bookings role:
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.InactiveBookings])
      .accessingTransferringPrisoner()
      .expectsStatus(PermissionCheckStatus.OK),
  )
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

export const deniedReadPropertyOverviewScenarios: TestScenarios = deniedBaseCheckScenarios
  .andScenarioWhere(
    // Global Search role is not sufficient to access transferring prisoner property overview:
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch])
      .accessingTransferringPrisoner()
      .expectsStatus(PermissionCheckStatus.PRISONER_IS_TRANSFERRING),
  )
  .and(
    // Access to restricted patient property overview denied without the Inactive Bookings role:
    grantedRestrictedPatientCheckScenarios
      .withoutUserRoles([Role.InactiveBookings])
      .withExpectedStatus(PermissionCheckStatus.RESTRICTED_PATIENT),
  )

export const readPropertyOverviewScenarios = grantedScenarios.and(deniedReadPropertyOverviewScenarios)
