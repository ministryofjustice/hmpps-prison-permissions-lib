import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
} from '../../../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios
  .and(grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionStatus.NOT_IN_CASELOAD))
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch])
      .accessingTransferringPrisoner()
      .expectsStatus(PermissionStatus.PRISONER_IS_TRANSFERRING),
  )

const grantedScenarios = grantedRestrictedPatientCheckScenarios
  .and(grantedReleasedPrisonerCheckScenarios)
  .and(grantedCaseLoadCheckScenarios)
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.InactiveBookings])
      .accessingTransferringPrisoner()
      .expectsStatus(PermissionStatus.OK),
  )

// eslint-disable-next-line import/prefer-default-export
export const photoReadScenarios = grantedScenarios.and(deniedScenarios)
