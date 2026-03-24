import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../../testUtils/TestScenario'
import { deniedBaseCheckScenarios, grantedCaseLoadCheckScenarios } from '../../../../baseCheck/BaseCheckScenarios'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { Role } from '../../../../../../../types/internal/user/Role'

const deniedDietReadScenarios: TestScenarios = new TestScenarios([
  // Released prisoners cannot access diet info
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.InactiveBookings])
    .accessingReleasedPrisoner()
    .expectsStatus(PermissionCheckStatus.PRISONER_IS_RELEASED),

  // Transferring prisoners cannot access diet info
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.GlobalSearch])
    .accessingTransferringPrisoner()
    .expectsStatus(PermissionCheckStatus.PRISONER_IS_TRANSFERRING),

  // Global search outside caseload cannot access diet info
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.GlobalSearch])
    .accessingPrisonerAt('LEI')
    .expectsStatus(PermissionCheckStatus.NOT_IN_CASELOAD),

  // Restricted patient without supporting prison in caseload
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.InactiveBookings])
    .accessingRestrictedPatientSupportedBy('LEI')
    .expectsStatus(PermissionCheckStatus.RESTRICTED_PATIENT),
])

const grantedRestrictedPatientDietReadScenarios: TestScenarios = new TestScenarios([
  // Restricted patient with supporting prison in user's caseload (POM)
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.PomUser])
    .accessingRestrictedPatientSupportedBy('MDI')
    .expectsStatus(PermissionCheckStatus.OK),

  // Restricted patient with supporting prison in additional caseload (POM)
  userWithActiveCaseLoad('MDI')
    .withAdditionalCaseLoads(['LEI'])
    .withRoles([Role.PomUser])
    .accessingRestrictedPatientSupportedBy('LEI')
    .expectsStatus(PermissionCheckStatus.OK),

  // Restricted patient with supporting prison in user's caseload (InactiveBookings)
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.InactiveBookings])
    .accessingRestrictedPatientSupportedBy('MDI')
    .expectsStatus(PermissionCheckStatus.OK),
])

const grantedDietReadScenarios: TestScenarios = grantedCaseLoadCheckScenarios.and(
  grantedRestrictedPatientDietReadScenarios,
)

// eslint-disable-next-line import/prefer-default-export
export const dietReadScenarios = grantedDietReadScenarios.and(deniedBaseCheckScenarios).and(deniedDietReadScenarios)
