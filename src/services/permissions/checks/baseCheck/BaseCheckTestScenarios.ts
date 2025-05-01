import { TestScenarios, userWithActiveCaseLoad } from '../../../../testUtils/TestScenario'
import { PermissionCheckStatus } from '../../../../types/permissions/PermissionCheckStatus'
import { Role } from '../../../../types/user/Role'

export const deniedRestrictedPatientCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([])
    .accessingRestrictedPatientSupportedBy('MDI')
    .expectsStatus(PermissionCheckStatus.RESTRICTED_PATIENT),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.GlobalSearch])
    .accessingRestrictedPatientSupportedBy('MDI')
    .expectsStatus(PermissionCheckStatus.RESTRICTED_PATIENT),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.PomUser])
    .accessingRestrictedPatientSupportedBy('LEI')
    .expectsStatus(PermissionCheckStatus.RESTRICTED_PATIENT),
])

export const grantedRestrictedPatientCheckScenarios = new TestScenarios([
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

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.InactiveBookings])
    .accessingRestrictedPatientSupportedBy('LEI')
    .expectsStatus(PermissionCheckStatus.OK),
])

export const deniedReleasedPrisonerCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([])
    .accessingReleasedPrisoner()
    .expectsStatus(PermissionCheckStatus.PRISONER_IS_RELEASED),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.GlobalSearch])
    .accessingReleasedPrisoner()
    .expectsStatus(PermissionCheckStatus.PRISONER_IS_RELEASED),
])

export const grantedReleasedPrisonerCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.InactiveBookings])
    .accessingReleasedPrisoner()
    .expectsStatus(PermissionCheckStatus.OK),
])

export const deniedTransferringPrisonerCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([])
    .accessingTransferringPrisoner()
    .expectsStatus(PermissionCheckStatus.PRISONER_IS_TRANSFERRING),
])

export const grantedTransferringPrisonerCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.GlobalSearch])
    .accessingTransferringPrisoner()
    .expectsStatus(PermissionCheckStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.InactiveBookings])
    .accessingTransferringPrisoner()
    .expectsStatus(PermissionCheckStatus.OK),
])

export const deniedCaseLoadCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([])
    .accessingPrisonerAt('LEI')
    .expectsStatus(PermissionCheckStatus.NOT_IN_CASELOAD),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.PomUser])
    .accessingPrisonerAt('LEI')
    .expectsStatus(PermissionCheckStatus.NOT_IN_CASELOAD),
])

export const grantedCaseLoadCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI').withRoles([]).accessingPrisonerAt('MDI').expectsStatus(PermissionCheckStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withAdditionalCaseLoads(['LEI'])
    .withRoles([])
    .accessingPrisonerAt('LEI')
    .expectsStatus(PermissionCheckStatus.OK),
])

export const grantedGlobalSearchCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.GlobalSearch])
    .accessingPrisonerAt('LEI')
    .expectsStatus(PermissionCheckStatus.OK),
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
