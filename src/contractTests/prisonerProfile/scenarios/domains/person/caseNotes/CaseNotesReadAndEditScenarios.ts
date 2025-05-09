import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
} from '../../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../../../types/permissions/PermissionCheckStatus'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios
  .and(
    grantedGlobalSearchCheckScenarios
      .withoutUserRoles([Role.PomUser])
      .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch])
      .accessingTransferringPrisoner()
      .expectsStatus(PermissionCheckStatus.PRISONER_IS_TRANSFERRING),
  )

const grantedScenarios = grantedRestrictedPatientCheckScenarios
  .and(grantedReleasedPrisonerCheckScenarios)
  .and(grantedCaseLoadCheckScenarios)
  .and(grantedGlobalSearchCheckScenarios.withUserRoles([Role.PomUser]))
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.InactiveBookings])
      .accessingTransferringPrisoner()
      .expectsStatus(PermissionCheckStatus.OK),
  )

// eslint-disable-next-line import/prefer-default-export
export const caseNotesReadAndEditScenarios = grantedScenarios.and(deniedScenarios)
