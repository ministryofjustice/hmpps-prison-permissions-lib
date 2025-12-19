import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../../testUtils/TestScenario'
import { deniedBaseCheckScenarios, grantedBaseCheckScenarios } from '../../../../baseCheck/BaseCheckScenarios'
import CaseLoad from '../../../../../../../types/internal/user/CaseLoad'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'
import { Role } from '../../../../../../../types/internal/user/Role'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios
  .withUserRole(Role.ActivityHub)
  .and(
    grantedBaseCheckScenarios
      .withUserRole(Role.ActivityHub)
      .withCaseLoads([
        { caseLoadId: 'SOMETHING_DIFFERENT', currentlyActive: true } as CaseLoad,
        { caseLoadId: 'MDI', currentlyActive: false } as CaseLoad,
        { caseLoadId: 'LEI', currentlyActive: false } as CaseLoad,
      ])
      .withExpectedStatus(PermissionStatus.NOT_ACTIVE_CASELOAD),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI') //
      .withRoles([]) // No Activity Hub role
      .accessingPrisonerAt('MDI')
      .expectsStatus(PermissionStatus.ROLE_NOT_PRESENT),
  )

const grantedScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI') //
    .withRoles([Role.ActivityHub])
    .accessingPrisonerAt('MDI')
    .expectsStatus(PermissionStatus.OK),
])

// eslint-disable-next-line import/prefer-default-export
export const prisonerActivityEditScenarios = grantedScenarios.and(deniedScenarios)
