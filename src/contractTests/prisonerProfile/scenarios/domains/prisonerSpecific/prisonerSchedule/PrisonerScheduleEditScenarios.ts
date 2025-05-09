import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../testUtils/TestScenario'
import { deniedBaseCheckScenarios, grantedBaseCheckScenarios } from '../../../baseCheck/BaseCheckScenarios'
import CaseLoad from '../../../../../../types/user/CaseLoad'
import { PermissionCheckStatus } from '../../../../../../types/permissions/PermissionCheckStatus'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios.and(
  grantedBaseCheckScenarios
    .withCaseLoads([
      { caseLoadId: 'SOMETHING_DIFFERENT', currentlyActive: true } as CaseLoad,
      { caseLoadId: 'MDI', currentlyActive: false } as CaseLoad,
      { caseLoadId: 'LEI', currentlyActive: false } as CaseLoad,
    ])
    .withExpectedStatus(PermissionCheckStatus.NOT_ACTIVE_CASELOAD),
)

const grantedScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI') //
    .withRoles([])
    .accessingPrisonerAt('MDI')
    .expectsStatus(PermissionCheckStatus.OK),
])

// eslint-disable-next-line import/prefer-default-export
export const prisonerScheduleEditScenarios = grantedScenarios.and(deniedScenarios)
