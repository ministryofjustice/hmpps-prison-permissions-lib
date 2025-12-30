import { PrisonerMoneyPermission } from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { prisonerMoneyReadScenarios } from './prisonerMoneyRead/PrisonerMoneyReadScenarios'

describe('Prisoner Money', () => {
  scenarioTests<PrisonerMoneyPermission>({ [PrisonerMoneyPermission.read]: prisonerMoneyReadScenarios })
})
