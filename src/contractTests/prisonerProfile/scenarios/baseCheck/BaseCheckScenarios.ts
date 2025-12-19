import { TestScenarios, userWithActiveCaseLoad } from '../../../../testUtils/TestScenario'
import { Role } from '../../../../types/internal/user/Role'
import { PermissionStatus } from '../../../../types/internal/permissions/PermissionStatus'

export const deniedRestrictedPatientCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([])
    .accessingRestrictedPatientSupportedBy('MDI')
    .expectsStatus(PermissionStatus.RESTRICTED_PATIENT),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.GlobalSearch])
    .accessingRestrictedPatientSupportedBy('MDI')
    .expectsStatus(PermissionStatus.RESTRICTED_PATIENT),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.PomUser])
    .accessingRestrictedPatientSupportedBy('LEI')
    .expectsStatus(PermissionStatus.RESTRICTED_PATIENT),
])

export const grantedRestrictedPatientCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.PomUser])
    .accessingRestrictedPatientSupportedBy('MDI')
    .expectsStatus(PermissionStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withAdditionalCaseLoads(['LEI'])
    .withRoles([Role.PomUser])
    .accessingRestrictedPatientSupportedBy('MDI')
    .expectsStatus(PermissionStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withAdditionalCaseLoads(['LEI'])
    .withRoles([Role.PomUser])
    .accessingRestrictedPatientSupportedBy('LEI')
    .expectsStatus(PermissionStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.InactiveBookings])
    .accessingRestrictedPatientSupportedBy('MDI')
    .expectsStatus(PermissionStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.InactiveBookings])
    .accessingRestrictedPatientSupportedBy('LEI')
    .expectsStatus(PermissionStatus.OK),
])

export const deniedReleasedPrisonerCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([])
    .accessingReleasedPrisoner()
    .expectsStatus(PermissionStatus.PRISONER_IS_RELEASED),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.GlobalSearch])
    .accessingReleasedPrisoner()
    .expectsStatus(PermissionStatus.PRISONER_IS_RELEASED),
])

export const grantedReleasedPrisonerCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.InactiveBookings])
    .accessingReleasedPrisoner()
    .expectsStatus(PermissionStatus.OK),
])

export const deniedTransferringPrisonerCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([])
    .accessingTransferringPrisoner()
    .expectsStatus(PermissionStatus.PRISONER_IS_TRANSFERRING),
])

export const grantedTransferringPrisonerCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.GlobalSearch])
    .accessingTransferringPrisoner()
    .expectsStatus(PermissionStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.InactiveBookings])
    .accessingTransferringPrisoner()
    .expectsStatus(PermissionStatus.OK),
])

export const deniedCaseLoadCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([])
    .accessingPrisonerAt('LEI')
    .expectsStatus(PermissionStatus.NOT_IN_CASELOAD),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.PomUser])
    .accessingPrisonerAt('LEI')
    .expectsStatus(PermissionStatus.NOT_IN_CASELOAD),
])

export const grantedCaseLoadCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI').withRoles([]).accessingPrisonerAt('MDI').expectsStatus(PermissionStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withAdditionalCaseLoads(['LEI'])
    .withRoles([])
    .accessingPrisonerAt('LEI')
    .expectsStatus(PermissionStatus.OK),
])

export const grantedGlobalSearchCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.GlobalSearch])
    .accessingPrisonerAt('LEI')
    .expectsStatus(PermissionStatus.OK),
])

export const deniedBaseCheckScenarios = deniedRestrictedPatientCheckScenarios
  .and(deniedReleasedPrisonerCheckScenarios)
  .and(deniedTransferringPrisonerCheckScenarios)
  .and(deniedCaseLoadCheckScenarios)

export const grantedBaseCheckScenarios = grantedRestrictedPatientCheckScenarios
  .and(grantedReleasedPrisonerCheckScenarios)
  .and(grantedTransferringPrisonerCheckScenarios)
  .and(grantedCaseLoadCheckScenarios)
  .and(grantedGlobalSearchCheckScenarios)

export const baseCheckScenarios = grantedBaseCheckScenarios.and(deniedBaseCheckScenarios)
