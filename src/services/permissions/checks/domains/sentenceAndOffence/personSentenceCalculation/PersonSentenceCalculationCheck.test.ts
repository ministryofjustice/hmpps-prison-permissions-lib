import { PersonSentenceCalculationPermission } from '../../../../../../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { sentenceCalculationReadScenarios } from './sentenceCalculationRead/SentenceCalculationReadScenarios'
import { sentenceCalculationEditAdjustmentScenarios } from './sentenceCalculationAdjustmentEdit/SentenceCalculationEditAdjustmentScenarios'

describe('Person Sentence Calculation', () => {
  scenarioTests<PersonSentenceCalculationPermission>({
    [PersonSentenceCalculationPermission.read]: sentenceCalculationReadScenarios,
    [PersonSentenceCalculationPermission.edit_adjustments]: sentenceCalculationEditAdjustmentScenarios,
  })
})
