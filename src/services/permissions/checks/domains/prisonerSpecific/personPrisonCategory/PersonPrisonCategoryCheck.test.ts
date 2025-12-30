import { PersonPrisonCategoryPermission } from '../../../../../../types/public/permissions/domains/prisonerSpecific/personPrisonCategory/PersonPrisonCategoryPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { baseCheckScenarios } from '../../../baseCheck/BaseCheckScenarios'
import { personPrisonCategoryEditScenarios } from './personPrisonCategoryEdit/PersonPrisonCategoryEditScenarios'

describe('Person Prison Category', () => {
  scenarioTests<PersonPrisonCategoryPermission>({
    [PersonPrisonCategoryPermission.read]: baseCheckScenarios,
    [PersonPrisonCategoryPermission.edit]: personPrisonCategoryEditScenarios,
  })
})
