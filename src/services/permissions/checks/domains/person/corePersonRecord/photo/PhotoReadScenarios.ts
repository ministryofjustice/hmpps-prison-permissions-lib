import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
} from '../../../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios
  .and(grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch])
      .accessingTransferringPrisoner()
      .expectsStatus(PermissionCheckStatus.PRISONER_IS_TRANSFERRING),
  )

const grantedScenarios = grantedRestrictedPatientCheckScenarios
  .and(grantedReleasedPrisonerCheckScenarios)
  .and(grantedCaseLoadCheckScenarios)
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.InactiveBookings])
      .accessingTransferringPrisoner()
      .expectsStatus(PermissionCheckStatus.OK),
  )

// eslint-disable-next-line import/prefer-default-export
export const photoReadScenarios = grantedScenarios.and(deniedScenarios)
