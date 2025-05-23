import { TestScenarios } from '../../../../../../testUtils/TestScenario'
import {
  deniedCaseLoadCheckScenarios,
  deniedReleasedPrisonerCheckScenarios,
  deniedTransferringPrisonerCheckScenarios,
  grantedBaseCheckScenarios,
} from '../../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../../types/internal/user/Role'
import {
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../../../../services/permissions/checks/baseCheck/BaseCheckScenarios'
import { PermissionCheckStatus } from '../../../../../../types/internal/permissions/PermissionCheckStatus'

const allPermissiveRoles = [Role.PomUser, Role.ViewSensitiveCaseNotes, Role.AddSensitiveCaseNotes]

const deniedScenarios: TestScenarios = new TestScenarios([])
  .and(grantedReleasedPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT))
  .and(grantedTransferringPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT))
  .and(grantedCaseLoadCheckScenarios.withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT))
  .and(grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT))
  .and(deniedReleasedPrisonerCheckScenarios.withUserRoles(allPermissiveRoles))
  .and(deniedTransferringPrisonerCheckScenarios.withUserRoles(allPermissiveRoles))
  .and(deniedCaseLoadCheckScenarios.withUserRoles(allPermissiveRoles))

const grantedScenarios = new TestScenarios([])
  .and(grantedBaseCheckScenarios.withUserRole(Role.PomUser).withExpectedStatus(PermissionCheckStatus.OK))
  .and(grantedBaseCheckScenarios.withUserRole(Role.ViewSensitiveCaseNotes).withExpectedStatus(PermissionCheckStatus.OK))
  .and(grantedBaseCheckScenarios.withUserRole(Role.AddSensitiveCaseNotes).withExpectedStatus(PermissionCheckStatus.OK))

// eslint-disable-next-line import/prefer-default-export
export const sensitiveCaseNotesReadScenarios = grantedScenarios.and(deniedScenarios)
