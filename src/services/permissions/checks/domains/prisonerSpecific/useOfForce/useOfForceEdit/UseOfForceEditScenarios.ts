import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
} from '../../../../baseCheck/BaseCheckTestScenarios'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { Role } from '../../../../../../../types/internal/user/Role'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios
  .and(grantedRestrictedPatientCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD))
  .and(grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD))
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch])
      .accessingTransferringPrisoner()
      .expectsStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
  )

const grantedScenarios = grantedCaseLoadCheckScenarios
  .and(grantedReleasedPrisonerCheckScenarios)
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.InactiveBookings])
      .accessingTransferringPrisoner()
      .expectsStatus(PermissionCheckStatus.OK),
  )

// eslint-disable-next-line import/prefer-default-export
export const useOfForceEditScenarios = grantedScenarios.and(deniedScenarios)
