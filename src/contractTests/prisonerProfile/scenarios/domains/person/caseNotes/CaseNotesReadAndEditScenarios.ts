import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
} from '../../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../../types/internal/user/Role'
import { PermissionStatus } from '../../../../../../types/internal/permissions/PermissionStatus'
import { getCurrentDateMinusDaysAsString } from '../../../../../../services/permissions/utils/DateUtils'

const today = Date.now()
const twentyDaysAgo = getCurrentDateMinusDaysAsString(today, 20)
const ninetyFiveDaysAgo = getCurrentDateMinusDaysAsString(today, 95)

export const deniedCaseNotesReadAndEditScenarios: TestScenarios = deniedBaseCheckScenarios
  .and(
    grantedGlobalSearchCheckScenarios
      .withoutUserRoles([Role.PomUser])
      .withExpectedStatus(PermissionStatus.ROLE_NOT_PRESENT),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch])
      .accessingTransferringPrisoner()
      .expectsStatus(PermissionStatus.PRISONER_IS_TRANSFERRING),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('STI')
      .withRoles([Role.GlobalSearch, Role.PomUser])
      .accessingPrisonerAt('MDI')
      .expectsStatus(PermissionStatus.NOT_PERMITTED),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch, Role.PomUser])
      .accessingPrisonerAtAfterTransferFrom('STI', 'MDI', ninetyFiveDaysAgo)
      .expectsStatus(PermissionStatus.NOT_PERMITTED),
  )

export const grantedCaseNotesReadAndEditAfterTransferScenarios = new TestScenarios([])
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch, Role.PomUser])
      .accessingPrisonerAtAfterTransferFrom('STI', 'MDI', twentyDaysAgo)
      .expectsStatus(PermissionStatus.OK),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.GlobalSearch, Role.PomUser])
      .accessingPrisonerAtAfterTransferFrom('MDI', 'MDI')
      .expectsStatus(PermissionStatus.OK),
  )

export const grantedCaseNotesReadAndEditTransferringPrisonerScenarios = new TestScenarios([]).andScenarioWhere(
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.InactiveBookings])
    .accessingTransferringPrisoner()
    .expectsStatus(PermissionStatus.OK),
)

export const grantedCaseNotesReadAndEditScenarios = grantedRestrictedPatientCheckScenarios
  .and(grantedReleasedPrisonerCheckScenarios)
  .and(grantedCaseLoadCheckScenarios)
  .and(grantedCaseNotesReadAndEditAfterTransferScenarios)
  .and(grantedCaseNotesReadAndEditTransferringPrisonerScenarios)

export const caseNotesReadAndEditScenarios = grantedCaseNotesReadAndEditScenarios.and(
  deniedCaseNotesReadAndEditScenarios,
)
