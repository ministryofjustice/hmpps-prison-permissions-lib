import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { Role } from '../../../../../../types/internal/user/Role'
import { PrisonerPropertyPermission } from '../../../../../../types/public/permissions/domains/runningAPrison/prisonerProperty/PrisonerPropertyPermissions'
import { inUsersCaseLoadScenarios } from '../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoadScenarios'
import inUsersCaseLoadAndUserHasRoleScenarios from '../../../sharedChecks/inUsersCaseLoadAndUserHasRole/InUsersCaseLoadAndUserHasRoleScenarios'

describe('Prisoner Property', () => {
  scenarioTests<PrisonerPropertyPermission>({
    [PrisonerPropertyPermission.read_property]: inUsersCaseLoadScenarios,
    [PrisonerPropertyPermission.edit_property]: inUsersCaseLoadAndUserHasRoleScenarios(Role.PrisonerPropertyManage),
  })
})
