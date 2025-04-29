import { PrisonerBasePermission } from '../../types/permissions/prisoner/PrisonerPermissions'
import { scenarioTest } from '../../testUtils/TestScenario'
import { PersonSentenceCalculationPermission } from '../../types/permissions/domains/sentenceAndOffence/PersonSentenceCalculationPermissions'
import { baseCheckPrisonerProfileScenarios } from './scenarios/baseCheck/BaseCheckPrisonerProfileContractTestScenarios'
import { sentenceCalculationReadPrisonerProfileScenarios } from './scenarios/domains/sentenceAndOffence/personSentenceCalculation/SentenceCalculationReadPrisonerProfileContractTestScenarios'

describe('Prisoner Profile Contract Tests', () => {
  describe('Base check', () => {
    scenarioTest(baseCheckPrisonerProfileScenarios, PrisonerBasePermission.read)
  })

  describe('Domains', () => {
    describe('Sentence / Offence', () => {
      describe('Person Sentence Calculation', () => {
        scenarioTest(sentenceCalculationReadPrisonerProfileScenarios, PersonSentenceCalculationPermission.read)
      })
    })
  })
})
