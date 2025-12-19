import { TestScenarios } from '../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../../types/internal/user/Role'
import { PermissionStatus } from '../../../../../../types/internal/permissions/PermissionStatus'

const deniedScenarios: TestScenarios = new TestScenarios([])
  .and(deniedBaseCheckScenarios.withUserRoles([Role.CellMove]))
  .and(
    grantedBaseCheckScenarios.withoutUserRoles([Role.CellMove]).withExpectedStatus(PermissionStatus.ROLE_NOT_PRESENT),
  )
  .and(
    grantedGlobalSearchCheckScenarios
      .withUserRoles([Role.CellMove])
      .withExpectedStatus(PermissionStatus.NOT_IN_CASELOAD),
  )

const grantedScenarios = grantedRestrictedPatientCheckScenarios
  .and(grantedReleasedPrisonerCheckScenarios)
  .and(grantedTransferringPrisonerCheckScenarios)
  .and(grantedCaseLoadCheckScenarios)
  .withUserRoles([Role.CellMove])

// eslint-disable-next-line import/prefer-default-export
export const moveCellScenarios = grantedScenarios.and(deniedScenarios)
