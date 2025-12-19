import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../../testUtils/TestScenario'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../../../types/internal/user/Role'

const deniedPrisonerAdjudicationReadScenarios: TestScenarios = deniedBaseCheckScenarios
  // These granted base check scenarios should be denied without extra role present:
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionStatus.NOT_IN_CASELOAD))
  .and(grantedTransferringPrisonerCheckScenarios.withExpectedStatus(PermissionStatus.NOT_IN_CASELOAD))
  .and(grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionStatus.NOT_IN_CASELOAD))
  // and restricted patient base checks without POM user role:
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.InactiveBookings])
      .accessingRestrictedPatientSupportedBy('MDI')
      .expectsStatus(PermissionStatus.NOT_IN_CASELOAD),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.InactiveBookings])
      .accessingRestrictedPatientSupportedBy('LEI')
      .expectsStatus(PermissionStatus.NOT_IN_CASELOAD),
  )

const grantedPrisonerAdjudicationsReadScenarios = grantedCaseLoadCheckScenarios
  .and(grantedGlobalSearchCheckScenarios.withUserRoles([Role.PomUser]))
  .and(grantedGlobalSearchCheckScenarios.withUserRoles([Role.ReceptionUser]))
  .and(grantedReleasedPrisonerCheckScenarios.withUserRoles([Role.PomUser]))
  .and(grantedReleasedPrisonerCheckScenarios.withUserRoles([Role.ReceptionUser]))
  .and(grantedTransferringPrisonerCheckScenarios.withUserRoles([Role.PomUser]))
  .and(grantedTransferringPrisonerCheckScenarios.withUserRoles([Role.ReceptionUser]))
  .and(grantedRestrictedPatientCheckScenarios.withUserRoles([Role.PomUser]))
  .and(grantedRestrictedPatientCheckScenarios.withUserRoles([Role.ReceptionUser]))

// eslint-disable-next-line import/prefer-default-export
export const prisonerAdjudicationsReadScenarios = grantedPrisonerAdjudicationsReadScenarios.and(
  deniedPrisonerAdjudicationReadScenarios,
)
