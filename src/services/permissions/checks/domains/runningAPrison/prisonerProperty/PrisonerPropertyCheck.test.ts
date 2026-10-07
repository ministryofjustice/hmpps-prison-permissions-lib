import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { PrisonerPropertyPermission } from '../../../../../../types/public/permissions/domains/runningAPrison/prisonerProperty/PrisonerPropertyPermissions'
import { readPropertyDetailsScenarios } from './readPropertyDetails/ReadPropertyDetailsScenarios'
import { readPropertyOverviewScenarios } from './readPropertyOverview/ReadPropertyOverviewScenarios'
import { editPropertyDetailsScenarios } from './editPropertyDetails/EditPropertyDetailsScenarios'

describe('Prisoner Property', () => {
  scenarioTests<PrisonerPropertyPermission>({
    [PrisonerPropertyPermission.read_property_overview]: readPropertyOverviewScenarios,
    [PrisonerPropertyPermission.read_property_details]: readPropertyDetailsScenarios,
    [PrisonerPropertyPermission.edit_property_details]: editPropertyDetailsScenarios,
  })
})
