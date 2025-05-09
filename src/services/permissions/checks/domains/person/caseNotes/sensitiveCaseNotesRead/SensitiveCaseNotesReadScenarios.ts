import { Role } from '../../../../../../../types/user/Role'
import { TestScenarios } from '../../../../../../../testUtils/TestScenario'
import {
  deniedCaseLoadCheckScenarios,
  deniedReleasedPrisonerCheckScenarios,
  deniedTransferringPrisonerCheckScenarios,
  grantedBaseCheckScenarios,
} from '../../../../baseCheck/BaseCheckTestScenarios'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'

const deniedScenarios: TestScenarios = grantedBaseCheckScenarios
  .withoutUserRoles([Role.PomUser, Role.ViewSensitiveCaseNotes, Role.AddSensitiveCaseNotes])
  .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT)
  .and(
    deniedReleasedPrisonerCheckScenarios.withUserRoles([
      Role.PomUser,
      Role.ViewSensitiveCaseNotes,
      Role.AddSensitiveCaseNotes,
    ]),
  )
  .and(
    deniedTransferringPrisonerCheckScenarios.withUserRoles([
      Role.PomUser,
      Role.ViewSensitiveCaseNotes,
      Role.AddSensitiveCaseNotes,
    ]),
  )
  .and(
    deniedCaseLoadCheckScenarios.withUserRoles([Role.PomUser, Role.ViewSensitiveCaseNotes, Role.AddSensitiveCaseNotes]),
  )

const grantedScenarios = new TestScenarios([])
  .and(grantedBaseCheckScenarios.withUserRole(Role.PomUser).withExpectedStatus(PermissionCheckStatus.OK))
  .and(grantedBaseCheckScenarios.withUserRole(Role.ViewSensitiveCaseNotes).withExpectedStatus(PermissionCheckStatus.OK))
  .and(grantedBaseCheckScenarios.withUserRole(Role.AddSensitiveCaseNotes).withExpectedStatus(PermissionCheckStatus.OK))

// eslint-disable-next-line import/prefer-default-export
export const sensitiveCaseNotesReadScenarios = grantedScenarios.and(deniedScenarios)
