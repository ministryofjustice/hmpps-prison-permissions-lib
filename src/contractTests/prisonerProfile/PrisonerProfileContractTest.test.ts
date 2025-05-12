import { PrisonerBasePermission } from '../../types/permissions/prisoner/PrisonerPermissions'
import { scenarioTest } from '../../testUtils/TestScenario'
import { PersonSentenceCalculationPermission } from '../../types/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { baseCheckPrisonerProfileScenarios } from './scenarios/baseCheck/BaseCheckScenarios'
import { sentenceCalculationReadScenarios } from './scenarios/domains/sentenceAndOffence/personSentenceCalculation/SentenceCalculationReadScenarios'
import { sentenceCalculationEditAdjustmentScenarios } from './scenarios/domains/sentenceAndOffence/personSentenceCalculation/SentenceCalculationEditAdjustmentScenarios'
import { prisonerMoneyReadScenarios } from './scenarios/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyReadScenarios'
import { prisonerAdjudicationsReadPrisonerProfileScenarios } from './scenarios/domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsReadScenarios'
import { PrisonerAdjudicationsPermission } from '../../types/permissions/domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsPermissions'
import { CaseNotesPermission } from '../../types/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { personPrisonCategoryEditScenarios } from './scenarios/domains/prisonerSpecific/personPrisonCategory/PersonPrisonCategoryEditScenarios'
import { PersonPrisonCategoryPermission } from '../../types/permissions/domains/prisonerSpecific/personPrisonCategory/PersonPrisonCategoryPermissions'
import { prisonerIncentivesReadScenarios } from './scenarios/domains/prisonerSpecific/prisonerIncentives/PrisonerIncentivesReadScenarios'
import { PrisonerIncentivesPermission } from '../../types/permissions/domains/prisonerSpecific/prisonerIncentives/PrisonerIncentivesPermissions'
import { prisonerVisitsAndVisitorsReadScenarios } from './scenarios/domains/runningAPrison/prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsReadScenarios'
import { PrisonerVisitsAndVisitorsPermission } from '../../types/permissions/domains/runningAPrison/prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'
import { caseNotesReadAndEditScenarios } from './scenarios/domains/person/caseNotes/CaseNotesReadAndEditScenarios'
import { sensitiveCaseNotesReadScenarios } from './scenarios/domains/person/caseNotes/SensitiveCaseNotesReadScenarios'
import { sensitiveCaseNotesDeleteScenarios } from './scenarios/domains/person/caseNotes/SensitiveCaseNotesDeleteScenarios'
import { sensitiveCaseNotesEditScenarios } from './scenarios/domains/person/caseNotes/SensitiveCaseNotesEditScenarios'
import { PrisonerMoneyPermission } from '../../types/permissions/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissions'
import { prisonerScheduleEditScenarios } from '../../services/permissions/checks/domains/prisonerSpecific/prisonerSchedule/prisonerScheduleEdit/PrisonerScheduleEditScenarios'
import { PrisonerSchedulePermission } from '../../types/permissions/domains/prisonerSpecific/prisonerSchedule/PrisonerSchedulePermissions'
import { useOfForceEditScenarios } from './scenarios/domains/prisonerSpecific/useOfForce/UseOfForceEditScenarios'
import { UseOfForcePermission } from '../../types/permissions/domains/prisonerSpecific/useOfForce/UseOfForcePermissions'

/**
 * Please contact #connect-dps-devs if any of these tests break
 * due to permissions changes since this will affect the Prisoner Profile.
 */
describe('Prisoner Profile Contract Tests', () => {
  describe('Base check', () => {
    scenarioTest(baseCheckPrisonerProfileScenarios, PrisonerBasePermission.read)
  })

  describe('Domains', () => {
    describe('Person', () => {
      describe('Case Notes', () => {
        scenarioTest(caseNotesReadAndEditScenarios, CaseNotesPermission.read)
        scenarioTest(caseNotesReadAndEditScenarios, CaseNotesPermission.edit)
        scenarioTest(sensitiveCaseNotesReadScenarios, CaseNotesPermission.read_sensitive)
        scenarioTest(sensitiveCaseNotesDeleteScenarios, CaseNotesPermission.delete_sensitive)
        scenarioTest(sensitiveCaseNotesEditScenarios, CaseNotesPermission.edit_sensitive)
      })
    })

    describe('Prisoner Specific', () => {
      describe('Person Prison Category', () => {
        scenarioTest(personPrisonCategoryEditScenarios, PersonPrisonCategoryPermission.edit)
      })
      describe('Prisoner Adjudications', () => {
        scenarioTest(prisonerAdjudicationsReadPrisonerProfileScenarios, PrisonerAdjudicationsPermission.read)
      })
      describe('Prisoner Incentives', () => {
        scenarioTest(prisonerIncentivesReadScenarios, PrisonerIncentivesPermission.read)
      })
      describe('Prisoner Money', () => {
        scenarioTest(prisonerMoneyReadScenarios, PrisonerMoneyPermission.read)
      })
      describe('Prisoner Schedule', () => {
        scenarioTest(prisonerScheduleEditScenarios, PrisonerSchedulePermission.edit)
      })
      describe('Use of Force', () => {
        scenarioTest(useOfForceEditScenarios, UseOfForcePermission.edit)
      })
    })

    describe('Running A Prison', () => {
      describe('Prisoner Visits and Visitors', () => {
        scenarioTest(prisonerVisitsAndVisitorsReadScenarios, PrisonerVisitsAndVisitorsPermission.read)
      })
    })

    describe('Sentence / Offence', () => {
      describe('Person Sentence Calculation', () => {
        scenarioTest(sentenceCalculationReadScenarios, PersonSentenceCalculationPermission.read)
        scenarioTest(sentenceCalculationEditAdjustmentScenarios, PersonSentenceCalculationPermission.edit_adjustments)
      })
    })
  })
})
