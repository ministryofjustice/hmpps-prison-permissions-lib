import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../../../../../services/permissions/checks/baseCheck/BaseCheckScenarios'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { Role } from '../../../../../../../types/internal/user/Role'

const deniedDietReadScenarios: TestScenarios = deniedBaseCheckScenarios
  // Released prisoners denied (overrides InactiveBookings role from base check)
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.PRISONER_IS_RELEASED))
  // Transferring prisoners denied (overrides GlobalSearch and InactiveBookings roles from base check)
  .and(grantedTransferringPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.PRISONER_IS_TRANSFERRING))
  // Global search outside caseload denied (overrides GlobalSearch role from base check)
  .and(grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  // Restricted patients without supporting prison in caseload denied
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.PomUser])
      .accessingRestrictedPatientSupportedBy('LEI')
      .expectsStatus(PermissionCheckStatus.RESTRICTED_PATIENT),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.InactiveBookings])
      .accessingRestrictedPatientSupportedBy('LEI')
      .expectsStatus(PermissionCheckStatus.RESTRICTED_PATIENT),
  )

const grantedRestrictedPatientDietReadScenarios: TestScenarios = new TestScenarios([
  // Only restricted patient scenarios where supporting prison is in caseload
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.PomUser])
    .accessingRestrictedPatientSupportedBy('MDI')
    .expectsStatus(PermissionCheckStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withAdditionalCaseLoads(['LEI'])
    .withRoles([Role.PomUser])
    .accessingRestrictedPatientSupportedBy('MDI')
    .expectsStatus(PermissionCheckStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withAdditionalCaseLoads(['LEI'])
    .withRoles([Role.PomUser])
    .accessingRestrictedPatientSupportedBy('LEI')
    .expectsStatus(PermissionCheckStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.InactiveBookings])
    .accessingRestrictedPatientSupportedBy('MDI')
    .expectsStatus(PermissionCheckStatus.OK),
])

const grantedDietReadScenarios: TestScenarios = grantedCaseLoadCheckScenarios.and(
  grantedRestrictedPatientDietReadScenarios,
)

// eslint-disable-next-line import/prefer-default-export
export const dietReadScenarios = grantedDietReadScenarios.and(deniedDietReadScenarios)
