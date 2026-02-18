import { PersonInterventionsPermission } from '../../../../../../types/public/permissions/domains/interventions/personInterventions/PersonInterventionsPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { inUsersCaseLoadScenarios } from '../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoadScenarios'

describe('Person Interventions', () => {
  scenarioTests<PersonInterventionsPermission>({
    [PersonInterventionsPermission.read_csip]: inUsersCaseLoadScenarios,
    [PersonInterventionsPermission.edit_csip]: inUsersCaseLoadScenarios,
  })
})
