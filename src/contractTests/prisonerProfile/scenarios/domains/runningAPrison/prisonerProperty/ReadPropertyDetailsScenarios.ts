import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../testUtils/TestScenario'
import {
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
} from '../../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../../types/internal/permissions/PermissionCheckStatus'
import { deniedReadPropertyOverviewScenarios } from './ReadPropertyOverviewScenarios'

export const grantedReadPropertyDetailsScenarios: TestScenarios = grantedCaseLoadCheckScenarios
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

export const deniedReadPropertyDetailsScenarios: TestScenarios = deniedReadPropertyOverviewScenarios.and(
  grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD),
)

export const readPropertyDetailsScenarios = grantedReadPropertyDetailsScenarios.and(deniedReadPropertyDetailsScenarios)
