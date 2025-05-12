import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../testUtils/TestScenario'
import { deniedBaseCheckScenarios, grantedBaseCheckScenarios } from '../../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../../types/user/Role'
import CaseLoad from '../../../../../../types/user/CaseLoad'
import { PermissionCheckStatus } from '../../../../../../types/permissions/PermissionCheckStatus'

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
      .withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
  )
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI') //
      .withRoles([]) // No Activity Hub role
      .accessingPrisonerAt('MDI')
      .expectsStatus(PermissionCheckStatus.ROLE_NOT_PRESENT),
  )

const grantedScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI') //
    .withRoles([Role.ActivityHub])
    .accessingPrisonerAt('MDI')
    .expectsStatus(PermissionCheckStatus.OK),
])

// eslint-disable-next-line import/prefer-default-export
export const prisonerActivityEditScenarios = grantedScenarios.and(deniedScenarios)
