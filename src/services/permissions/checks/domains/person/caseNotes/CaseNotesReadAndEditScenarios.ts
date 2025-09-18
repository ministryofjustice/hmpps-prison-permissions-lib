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
import { getCurrentDateMinusDaysAsString } from '../../../../utils/DateUtils'

const today = Date.now()
const twentyDaysAgo = getCurrentDateMinusDaysAsString(today, 20)
const fortyDaysAgo = getCurrentDateMinusDaysAsString(today, 40)

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
  .andScenarioWhere(
    userWithActiveCaseLoad('STI')
      .withRoles([Role.GlobalSearch, Role.PomUser])
      .accessingPrisonerAtAfterTransferFrom('MDI', 'MDI')
      .expectsStatus(PermissionCheckStatus.NOT_PERMITTED),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch, Role.PomUser])
      .accessingPrisonerAtAfterTransferFrom('STI', 'MDI', fortyDaysAgo)
      .expectsStatus(PermissionCheckStatus.NOT_PERMITTED),
  )

const grantedScenarios = grantedRestrictedPatientCheckScenarios
  .and(grantedReleasedPrisonerCheckScenarios)
  .and(grantedCaseLoadCheckScenarios)
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch, Role.PomUser])
      .accessingPrisonerAtAfterTransferFrom('STI', 'MDI', twentyDaysAgo)
      .expectsStatus(PermissionCheckStatus.OK),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch, Role.PomUser])
      .accessingPrisonerAtAfterTransferFrom('MDI', 'MDI')
      .expectsStatus(PermissionCheckStatus.OK),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.InactiveBookings])
      .accessingTransferringPrisoner()
      .expectsStatus(PermissionCheckStatus.OK),
  )

// eslint-disable-next-line import/prefer-default-export
export const caseNotesReadAndEditScenarios = grantedScenarios.and(deniedScenarios)
