import { Role } from '../../../../../../../types/internal/user/Role'
import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
} from '../../../../baseCheck/BaseCheckScenarios'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'

const deniedScenarios: TestScenarios = new TestScenarios([])
  .and(deniedBaseCheckScenarios.withUserRoles([Role.UpdateAlert]))
  .and(
    grantedBaseCheckScenarios
      .withoutUserRoles([Role.UpdateAlert])
      .withExpectedStatus(PermissionStatus.ROLE_NOT_PRESENT),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch, Role.UpdateAlert])
      .accessingTransferringPrisoner()
      .expectsStatus(PermissionStatus.PRISONER_IS_TRANSFERRING),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch, Role.UpdateAlert])
      .accessingPrisonerAt('LEI')
      .expectsStatus(PermissionStatus.NOT_IN_CASELOAD),
  )

const grantedScenarios = grantedCaseLoadCheckScenarios
  .and(grantedRestrictedPatientCheckScenarios)
  .and(grantedReleasedPrisonerCheckScenarios)
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.InactiveBookings])
      .accessingTransferringPrisoner()
      .expectsStatus(PermissionStatus.OK),
  )
  .withUserRoles([Role.UpdateAlert])

// eslint-disable-next-line import/prefer-default-export
export const prisonerAlertsEditScenarios = grantedScenarios.and(deniedScenarios)
