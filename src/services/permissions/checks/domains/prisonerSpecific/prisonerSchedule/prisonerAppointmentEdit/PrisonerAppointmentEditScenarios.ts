import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../../testUtils/TestScenario'
import { deniedBaseCheckScenarios, grantedBaseCheckScenarios } from '../../../../baseCheck/BaseCheckScenarios'
import CaseLoad from '../../../../../../../types/internal/user/CaseLoad'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios.and(
  grantedBaseCheckScenarios
    .withCaseLoads([
      { caseLoadId: 'SOMETHING_DIFFERENT', currentlyActive: true } as CaseLoad,
      { caseLoadId: 'MDI', currentlyActive: false } as CaseLoad,
      { caseLoadId: 'LEI', currentlyActive: false } as CaseLoad,
    ])
    .withExpectedStatus(PermissionStatus.NOT_ACTIVE_CASELOAD),
)

const grantedScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI') //
    .withRoles([])
    .accessingPrisonerAt('MDI')
    .expectsStatus(PermissionStatus.OK),
])

// eslint-disable-next-line import/prefer-default-export
export const prisonerAppointmentEditScenarios = grantedScenarios.and(deniedScenarios)
