import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../../baseCheck/BaseCheckTestScenarios'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { Role } from '../../../../../../../types/internal/user/Role'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios
  .and(grantedTransferringPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT))
  .and(grantedCaseLoadCheckScenarios.withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT))
  .and(
    grantedGlobalSearchCheckScenarios
      .withUserRoles([Role.PomUser, Role.ViewProbationDocuments])
      .withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.InactiveBookings])
      .accessingRestrictedPatientSupportedBy('MDI')
      .expectsStatus(PermissionCheckStatus.ROLE_NOT_PRESENT),
  )

const grantedScenarios = new TestScenarios([])
  .and(grantedRestrictedPatientCheckScenarios.withUserRole(Role.PomUser))
  .and(grantedRestrictedPatientCheckScenarios.withUserRole(Role.ViewProbationDocuments))
  .and(grantedReleasedPrisonerCheckScenarios.withUserRole(Role.PomUser))
  .and(grantedReleasedPrisonerCheckScenarios.withUserRole(Role.ViewProbationDocuments))
  .and(grantedTransferringPrisonerCheckScenarios.withUserRole(Role.PomUser))
  .and(grantedTransferringPrisonerCheckScenarios.withUserRole(Role.ViewProbationDocuments))
  .and(grantedCaseLoadCheckScenarios.withUserRole(Role.PomUser))
  .and(grantedCaseLoadCheckScenarios.withUserRole(Role.ViewProbationDocuments))

// eslint-disable-next-line import/prefer-default-export
export const probationDocumentsReadScenarios = grantedScenarios.and(deniedScenarios)
