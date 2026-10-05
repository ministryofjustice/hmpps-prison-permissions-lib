import { scenarioTests } from '../../testUtils/TestScenario'
import { Role } from '../../types/internal/user/Role'
import inUsersCaseLoadAndUserHasRoleScenarios from './scenarios/InUsersCaseLoadAndUserHasRoleScenarios'
import { PrisonerPropertyPermission } from '../../types/public/permissions/domains/runningAPrison/prisonerProperty/PrisonerPropertyPermissions'
import { inUsersCaseLoadScenarios } from './scenarios/InUsersCaseLoadScenarios'

/**
 * Please contact #map-prisoner-property if any of these tests break
 * due to permissions changes since this will affect the Prisoner Property UI.
 */
describe('Prisoner Property UI Contract Tests', () => {
  scenarioTests<PrisonerPropertyPermission>({
    [PrisonerPropertyPermission.read_property]: inUsersCaseLoadScenarios,
    [PrisonerPropertyPermission.edit_property]: inUsersCaseLoadAndUserHasRoleScenarios(Role.PrisonerPropertyManage),
  })
})
