import { TestScenarios, userWithActiveCaseLoad } from '../../../../testUtils/TestScenario'
import { PermissionCheckStatus } from '../../../../types/permissions/PermissionCheckStatus'
import { Role } from '../../../../types/user/Role'

export const failingRestrictedPatientCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([])
    .accessingRestrictedPatientSupportedBy('MDI')
    .expectsStatus(PermissionCheckStatus.RESTRICTED_PATIENT),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.PomUser])
    .accessingRestrictedPatientSupportedBy('LEI')
    .expectsStatus(PermissionCheckStatus.RESTRICTED_PATIENT),
])

export const passingRestrictedPatientCheckScenarios = new TestScenarios([
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

export const failingReleasedPrisonerCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([])
    .accessingReleasedPrisoner()
    .expectsStatus(PermissionCheckStatus.PRISONER_IS_RELEASED),
])

export const passingReleasedPrisonerCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.InactiveBookings])
    .accessingReleasedPrisoner()
    .expectsStatus(PermissionCheckStatus.OK),
])

export const failingTransferringPrisonerCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([])
    .accessingTransferringPrisoner()
    .expectsStatus(PermissionCheckStatus.PRISONER_IS_TRANSFERRING),
])

export const passingTransferringPrisonerCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.GlobalSearch])
    .accessingTransferringPrisoner()
    .expectsStatus(PermissionCheckStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.InactiveBookings])
    .accessingTransferringPrisoner()
    .expectsStatus(PermissionCheckStatus.OK),
])

export const failingCaseLoadCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([])
    .accessingPrisonerAt('LEI')
    .expectsStatus(PermissionCheckStatus.NOT_IN_CASELOAD),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.PomUser])
    .accessingPrisonerAt('LEI')
    .expectsStatus(PermissionCheckStatus.NOT_IN_CASELOAD),
])

export const passingCaseLoadCheckScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI').withRoles([]).accessingPrisonerAt('MDI').expectsStatus(PermissionCheckStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withAdditionalCaseLoads(['LEI'])
    .withRoles([])
    .accessingPrisonerAt('LEI')
    .expectsStatus(PermissionCheckStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.GlobalSearch])
    .accessingPrisonerAt('LEI')
    .expectsStatus(PermissionCheckStatus.OK),

  userWithActiveCaseLoad('MDI')
    .withRoles([Role.GlobalSearch, Role.PomUser])
    .accessingPrisonerAt('LEI')
    .expectsStatus(PermissionCheckStatus.OK),
])

export const failingBaseCheckScenarios = failingRestrictedPatientCheckScenarios
  .and(failingReleasedPrisonerCheckScenarios)
  .and(failingTransferringPrisonerCheckScenarios)
  .and(failingCaseLoadCheckScenarios)

export const passingBaseCheckScenarios = passingRestrictedPatientCheckScenarios
  .and(passingReleasedPrisonerCheckScenarios)
  .and(passingTransferringPrisonerCheckScenarios)
  .and(passingCaseLoadCheckScenarios)

export const baseCheckPrisonerProfileScenarios = passingBaseCheckScenarios.and(failingBaseCheckScenarios)
