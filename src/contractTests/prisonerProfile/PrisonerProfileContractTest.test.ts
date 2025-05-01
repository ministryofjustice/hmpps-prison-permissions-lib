import { PrisonerBasePermission } from '../../types/permissions/prisoner/PrisonerPermissions'
import { scenarioTest } from '../../testUtils/TestScenario'
import { PersonSentenceCalculationPermission } from '../../types/permissions/domains/sentenceAndOffence/PersonSentenceCalculationPermissions'
import { baseCheckPrisonerProfileScenarios } from './scenarios/baseCheck/BaseCheckPrisonerProfileContractTestScenarios'
import { sentenceCalculationReadPrisonerProfileScenarios } from './scenarios/domains/sentenceAndOffence/personSentenceCalculation/SentenceCalculationReadPrisonerProfileContractTestScenarios'
import { sentenceCalculationEditAdjustmentPrisonerProfileScenarios } from './scenarios/domains/sentenceAndOffence/personSentenceCalculation/SentenceCalculationEditAdjustmentPrisonerProfileContractTestScenarios'
import { prisonerMoneyReadPrisonerProfileScenarios } from './scenarios/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyReadPrisonerProfileContractTestScenarios'
import { PrisonerMoneyPermission } from '../../types/permissions/domains/prisonerSpecific/PrisonerMoneyPermissions'

/**
 * Please contact #connect-dps-devs if any of these tests break
 * due to permissions changes since this will affect the Prisoner Profile.
 */
describe('Prisoner Profile Contract Tests', () => {
  describe('Base check', () => {
    scenarioTest(baseCheckPrisonerProfileScenarios, PrisonerBasePermission.read)
  })

  describe('Domains', () => {
    describe('Sentence / Offence', () => {
      describe('Person Sentence Calculation', () => {
        scenarioTest(sentenceCalculationReadPrisonerProfileScenarios, PersonSentenceCalculationPermission.read)
        scenarioTest(
          sentenceCalculationEditAdjustmentPrisonerProfileScenarios,
          PersonSentenceCalculationPermission.edit_adjustments,
        )
      })
    })

    describe('Prisoner Specific', () => {
      describe('Prisoner Money', () => {
        scenarioTest(prisonerMoneyReadPrisonerProfileScenarios, PrisonerMoneyPermission.read)
      })
    })
  })
})
