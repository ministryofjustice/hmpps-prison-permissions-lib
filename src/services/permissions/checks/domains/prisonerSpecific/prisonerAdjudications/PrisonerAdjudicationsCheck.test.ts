import { PrisonerAdjudicationsPermission } from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { prisonerAdjudicationsReadScenarios } from './prisonerAdjudicationsRead/PrisonerAdjudicationsReadScenarios'

describe('Prisoner Adjudications', () => {
  scenarioTests<PrisonerAdjudicationsPermission>({
    [PrisonerAdjudicationsPermission.read]: prisonerAdjudicationsReadScenarios,
  })
})
