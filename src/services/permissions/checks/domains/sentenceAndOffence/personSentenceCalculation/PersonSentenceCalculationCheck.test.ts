import { PersonSentenceCalculationPermission } from '../../../../../../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { baseCheckScenarios } from '../../../baseCheck/BaseCheckScenarios'
import { sentenceCalculationEditScenarios } from './sentenceCalculationEdit/SentenceCalculationEditScenarios'
import { sentenceCalculationEditAdjustmentScenarios } from './sentenceCalculationAdjustmentEdit/SentenceCalculationEditAdjustmentScenarios'

describe('Person Sentence Calculation', () => {
  scenarioTests<PersonSentenceCalculationPermission>({
    [PersonSentenceCalculationPermission.read]: baseCheckScenarios,
    [PersonSentenceCalculationPermission.edit]: sentenceCalculationEditScenarios,
    [PersonSentenceCalculationPermission.edit_adjustments]: sentenceCalculationEditAdjustmentScenarios,
  })
})
