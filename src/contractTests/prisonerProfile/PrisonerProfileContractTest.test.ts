import { PrisonerBasePermission } from '../../types/public/permissions/prisoner/PrisonerPermissions'
import { scenarioTest } from '../../testUtils/TestScenario'
import { PersonSentenceCalculationPermission } from '../../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { baseCheckPrisonerProfileScenarios } from './scenarios/baseCheck/BaseCheckScenarios'
import { sentenceCalculationReadScenarios } from './scenarios/domains/sentenceAndOffence/personSentenceCalculation/SentenceCalculationReadScenarios'
import { sentenceCalculationEditAdjustmentScenarios } from './scenarios/domains/sentenceAndOffence/personSentenceCalculation/SentenceCalculationEditAdjustmentScenarios'
import { prisonerMoneyReadScenarios } from './scenarios/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyReadScenarios'
import { prisonerAdjudicationsReadPrisonerProfileScenarios } from './scenarios/domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsReadScenarios'
import { PrisonerAdjudicationsPermission } from '../../types/public/permissions/domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsPermissions'
import { CaseNotesPermission } from '../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { personPrisonCategoryEditScenarios } from './scenarios/domains/prisonerSpecific/personPrisonCategory/PersonPrisonCategoryEditScenarios'
import { PersonPrisonCategoryPermission } from '../../types/public/permissions/domains/prisonerSpecific/personPrisonCategory/PersonPrisonCategoryPermissions'
import { prisonerIncentivesReadScenarios } from './scenarios/domains/prisonerSpecific/prisonerIncentives/PrisonerIncentivesReadScenarios'
import { PrisonerIncentivesPermission } from '../../types/public/permissions/domains/prisonerSpecific/prisonerIncentives/PrisonerIncentivesPermissions'
import { prisonerVisitsAndVisitorsReadScenarios } from './scenarios/domains/runningAPrison/prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsReadScenarios'
import { PrisonerVisitsAndVisitorsPermission } from '../../types/public/permissions/domains/runningAPrison/prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'
import { caseNotesReadAndEditScenarios } from './scenarios/domains/person/caseNotes/CaseNotesReadAndEditScenarios'
import { sensitiveCaseNotesReadScenarios } from './scenarios/domains/person/caseNotes/SensitiveCaseNotesReadScenarios'
import { sensitiveCaseNotesDeleteScenarios } from './scenarios/domains/person/caseNotes/SensitiveCaseNotesDeleteScenarios'
import { sensitiveCaseNotesEditScenarios } from './scenarios/domains/person/caseNotes/SensitiveCaseNotesEditScenarios'
import { PrisonerMoneyPermission } from '../../types/public/permissions/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissions'
import { PrisonerSchedulePermission } from '../../types/public/permissions/domains/prisonerSpecific/prisonerSchedule/PrisonerSchedulePermissions'
import { useOfForceEditScenarios } from './scenarios/domains/prisonerSpecific/useOfForce/UseOfForceEditScenarios'
import { UseOfForcePermission } from '../../types/public/permissions/domains/prisonerSpecific/useOfForce/UseOfForcePermissions'
import { prisonerAppointmentEditScenarios } from './scenarios/domains/prisonerSpecific/prisonerSchedule/PrisonerAppointmentEditScenarios'
import { prisonerActivityEditScenarios } from './scenarios/domains/prisonerSpecific/prisonerSchedule/PrisonerActivityEditScenarios'
import { pathfinderReadScenarios } from '../../services/permissions/checks/domains/security/pathfinder/pathfinderRead/PathfinderReadScenarios'
import { PathfinderPermission } from '../../types/public/permissions/domains/security/pathfinder/PathfinderPermissions'
import { pathfinderEditScenarios } from '../../services/permissions/checks/domains/security/pathfinder/pathfinderEdit/PathfinderEditScenarios'
import { socReadScenarios } from '../../services/permissions/checks/domains/security/soc/socRead/SOCReadScenarios'
import { SOCPermission } from '../../types/public/permissions/domains/security/soc/SOCPermissions'
import { socEditScenarios } from '../../services/permissions/checks/domains/security/soc/socEdit/SocEditScenarios'
import { probationDocumentsReadScenarios } from '../../services/permissions/checks/domains/probation/probationDocuments/probationDocumentsRead/ProbationDocumentsReadScenarios'
import { ProbationDocumentsPermission } from '../../types/public/permissions/domains/probation/probationDocuments/ProbationDocumentsPermissions'
import { csipReadScenarios } from '../../services/permissions/checks/domains/interventions/personInterventions/csipRead/CSIPReadScenarios'
import { PersonInterventionsPermission } from '../../types/public/permissions/domains/interventions/personInterventions/PersonInterventionsPermissions'
import { prisonerAlertsEditScenarios } from '../../services/permissions/checks/domains/prisonerSpecific/personAlerts/prisonerAlertsEdit/PrisonerAlertsEditScenarios'
import { PrisonerAlertsPermission } from '../../types/public/permissions/domains/prisonerSpecific/prisonerAlerts/PrisonerAlertsPermissions'
import { locationDetailsAndHistoryReadScenarios } from '../../services/permissions/checks/domains/runningAPrison/prisonerBaseLocation/locationDetailsAndHistoryRead/LocationDetailsAndHistoryReadScenarios'
import { PrisonerBaseLocationPermission } from '../../types/public/permissions/domains/runningAPrison/prisonerBaseLocation/PrisonerBaseLocationPermissions'
import { moveCellScenarios } from '../../services/permissions/checks/domains/runningAPrison/prisonerBaseLocation/moveCell/MoveCellScenarios'

/**
 * Please contact #connect-dps-devs if any of these tests break
 * due to permissions changes since this will affect the Prisoner Profile.
 */
describe('Prisoner Profile Contract Tests', () => {
  describe('Base check', () => {
    scenarioTest(baseCheckPrisonerProfileScenarios, PrisonerBasePermission.read)
  })

  describe('Domains', () => {
    describe('Interventions', () => {
      describe('Person Interventions', () => {
        scenarioTest(csipReadScenarios, PersonInterventionsPermission.read_csip)
      })
    })

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
        scenarioTest(prisonerAppointmentEditScenarios, PrisonerSchedulePermission.edit_appointment)
        scenarioTest(prisonerActivityEditScenarios, PrisonerSchedulePermission.edit_activity)
      })
      describe('Use of Force', () => {
        scenarioTest(useOfForceEditScenarios, UseOfForcePermission.edit)
      })
      describe('Prisoner Alerts', () => {
        scenarioTest(prisonerAlertsEditScenarios, PrisonerAlertsPermission.edit)
      })
    })

    describe('Probation', () => {
      describe('Probation Documents', () => {
        scenarioTest(probationDocumentsReadScenarios, ProbationDocumentsPermission.read)
      })
    })

    describe('Running A Prison', () => {
      describe('Prisoner Visits and Visitors', () => {
        scenarioTest(prisonerVisitsAndVisitorsReadScenarios, PrisonerVisitsAndVisitorsPermission.read)
      })

      describe('Prisoner Base Location', () => {
        scenarioTest(locationDetailsAndHistoryReadScenarios, PrisonerBaseLocationPermission.read_location_details)
        scenarioTest(locationDetailsAndHistoryReadScenarios, PrisonerBaseLocationPermission.read_location_history)
        scenarioTest(moveCellScenarios, PrisonerBaseLocationPermission.move_cell)
      })
    })

    describe('Security', () => {
      describe('Pathfinder', () => {
        scenarioTest(pathfinderReadScenarios, PathfinderPermission.read)
        scenarioTest(pathfinderEditScenarios, PathfinderPermission.edit)
      })
      describe('SOC', () => {
        scenarioTest(socReadScenarios, SOCPermission.read)
        scenarioTest(socEditScenarios, SOCPermission.edit)
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
