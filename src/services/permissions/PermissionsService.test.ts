import PermissionsService from './PermissionsService'
import PrisonerSearchClient from '../../data/hmppsPrisonerSearch/PrisonerSearchClient'
import PermissionsLogger from './PermissionsLogger'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { scenarioTest } from '../../testUtils/TestScenario'
import { baseCheckScenarios } from './checks/baseCheck/BaseCheckTestScenarios'
import { PersonSentenceCalculationPermission } from '../../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { sentenceCalculationReadScenarios } from './checks/domains/sentenceAndOffence/personSentenceCalculation/sentenceCalculationRead/SentenceCalculationReadScenarios'
import { sentenceCalculationEditAdjustmentScenarios } from './checks/domains/sentenceAndOffence/personSentenceCalculation/sentenceCalculationAdjustmentEdit/SentenceCalculationEditAdjustmentScenarios'
import { PrisonerMoneyPermission } from '../../types/public/permissions/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissions'
import { prisonerMoneyReadScenarios } from './checks/domains/prisonerSpecific/prisonerMoney/prisonerMoneyRead/PrisonerMoneyReadScenarios'
import { prisonerAdjudicationsReadScenarios } from './checks/domains/prisonerSpecific/prisonerAdjudications/prisonerAdjudicationsRead/PrisonerAdjudicationsReadScenarios'
import { PrisonerAdjudicationsPermission } from '../../types/public/permissions/domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsPermissions'
import { prisonerVisitsAndVisitorsReadScenarios } from './checks/domains/runningAPrison/prisonerVisitsAndVisitors/prisonerVisitsAndVisitorsRead/PrisonerVisitsAndVisitorsReadScenarios'
import { PrisonerVisitsAndVisitorsPermission } from '../../types/public/permissions/domains/runningAPrison/prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'
import { prisonerIncentivesReadScenarios } from './checks/domains/prisonerSpecific/prisonerIncentives/prisonerIncentivesRead/PrisonerIncentivesReadScenarios'
import { PrisonerIncentivesPermission } from '../../types/public/permissions/domains/prisonerSpecific/prisonerIncentives/PrisonerIncentivesPermissions'
import { personPrisonCategoryEditScenarios } from './checks/domains/prisonerSpecific/personPrisonCategory/personPrisonCategoryEdit/PersonPrisonCategoryEditScenarios'
import { PersonPrisonCategoryPermission } from '../../types/public/permissions/domains/prisonerSpecific/personPrisonCategory/PersonPrisonCategoryPermissions'
import { caseNotesReadScenarios } from './checks/domains/person/caseNotes/caseNotesRead/CaseNotesReadScenarios'
import { CaseNotesPermission } from '../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { sensitiveCaseNotesReadScenarios } from './checks/domains/person/caseNotes/sensitiveCaseNotesRead/SensitiveCaseNotesReadScenarios'
import { sensitiveCaseNotesDeleteScenarios } from './checks/domains/person/caseNotes/sensitiveCaseNotesDelete/SensitiveCaseNotesDeleteScenarios'
import { sensitiveCaseNotesEditScenarios } from './checks/domains/person/caseNotes/sensitiveCaseNotesEdit/SensitiveCaseNotesEditScenarios'
import { caseNotesEditScenarios } from './checks/domains/person/caseNotes/caseNotesEdit/CaseNotesEditScenarios'
import { useOfForceEditScenarios } from './checks/domains/prisonerSpecific/useOfForce/useOfForceEdit/UseOfForceEditScenarios'
import { UseOfForcePermission } from '../../types/public/permissions/domains/prisonerSpecific/useOfForce/UseOfForcePermissions'
import { PrisonerSchedulePermission } from '../../types/public/permissions/domains/prisonerSpecific/prisonerSchedule/PrisonerSchedulePermissions'
import { prisonerActivityEditScenarios } from './checks/domains/prisonerSpecific/prisonerSchedule/prisonerActivityEdit/PrisonerActivityEditScenarios'
import { prisonerAppointmentEditScenarios } from './checks/domains/prisonerSpecific/prisonerSchedule/prisonerAppointmentEdit/PrisonerAppointmentEditScenarios'
import { pathfinderReadScenarios } from './checks/domains/security/pathfinder/pathfinderRead/PathfinderReadScenarios'
import { PathfinderPermission } from '../../types/public/permissions/domains/security/pathfinder/PathfinderPermissions'
import { pathfinderEditScenarios } from './checks/domains/security/pathfinder/pathfinderEdit/PathfinderEditScenarios'
import { socReadScenarios } from './checks/domains/security/soc/socRead/SOCReadScenarios'
import { SOCPermission } from '../../types/public/permissions/domains/security/soc/SOCPermissions'
import { socEditScenarios } from './checks/domains/security/soc/socEdit/SocEditScenarios'
import { probationDocumentsReadScenarios } from './checks/domains/probation/probationDocuments/probationDocumentsRead/ProbationDocumentsReadScenarios'
import { ProbationDocumentsPermission } from '../../types/public/permissions/domains/probation/probationDocuments/ProbationDocumentsPermissions'
import { csipReadScenarios } from './checks/domains/interventions/personInterventions/csipRead/CSIPReadScenarios'
import { PersonInterventionsPermission } from '../../types/public/permissions/domains/interventions/personInterventions/PersonInterventionsPermissions'
import { PrisonerBasePermission } from '../../types/public/permissions/prisoner/PrisonerPermissions'
import { prisonerAlertsEditScenarios } from './checks/domains/prisonerSpecific/personAlerts/prisonerAlertsEdit/PrisonerAlertsEditScenarios'
import { PrisonerAlertsPermission } from '../../types/public/permissions/domains/prisonerSpecific/prisonerAlerts/PrisonerAlertsPermissions'
import { locationDetailsAndHistoryReadScenarios } from './checks/domains/runningAPrison/prisonerBaseLocation/locationDetailsAndHistoryRead/LocationDetailsAndHistoryReadScenarios'
import { PrisonerBaseLocationPermission } from '../../types/public/permissions/domains/runningAPrison/prisonerBaseLocation/PrisonerBaseLocationPermissions'
import { moveCellScenarios } from './checks/domains/runningAPrison/prisonerBaseLocation/moveCell/MoveCellScenarios'

const permissionsLogger = new PermissionsLogger(console)

describe('PermissionsService', () => {
  let prisonerSearchClient: PrisonerSearchClient

  let service: PermissionsService

  beforeEach(() => {
    prisonerSearchClient = { getPrisonerDetails: jest.fn() } as unknown as PrisonerSearchClient

    // @ts-expect-error - We are using a private constructor here for testing
    service = new (PermissionsService as unknown)(prisonerSearchClient, permissionsLogger)
  })

  describe('getPrisonerPermissions', () => {
    describe('Base check', () => {
      scenarioTest(baseCheckScenarios, PrisonerBasePermission.read)
    })

    describe('Domains', () => {
      describe('Interventions', () => {
        describe('Person Interventions', () => {
          scenarioTest(csipReadScenarios, PersonInterventionsPermission.read_csip)
        })
      })

      describe('Person', () => {
        describe('Case Notes', () => {
          scenarioTest(caseNotesReadScenarios, CaseNotesPermission.read)
          scenarioTest(caseNotesEditScenarios, CaseNotesPermission.edit)
          scenarioTest(sensitiveCaseNotesReadScenarios, CaseNotesPermission.read_sensitive)
          scenarioTest(sensitiveCaseNotesDeleteScenarios, CaseNotesPermission.delete_sensitive)
          scenarioTest(sensitiveCaseNotesEditScenarios, CaseNotesPermission.edit_sensitive)
        })
      })

      describe('Prisoner Specific', () => {
        describe('Prisoner Money', () => {
          scenarioTest(prisonerMoneyReadScenarios, PrisonerMoneyPermission.read)
        })
        describe('Prisoner Adjudications', () => {
          scenarioTest(prisonerAdjudicationsReadScenarios, PrisonerAdjudicationsPermission.read)
        })
        describe('Prisoner Incentives', () => {
          scenarioTest(prisonerIncentivesReadScenarios, PrisonerIncentivesPermission.read)
        })
        describe('Person Prison Category', () => {
          scenarioTest(personPrisonCategoryEditScenarios, PersonPrisonCategoryPermission.edit)
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

      describe('Running a Prison', () => {
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

  describe('getPrisonerDetails', () => {
    it('returns result from Prisoner Search client', async () => {
      const prisonerData = { prisonerNumber: 'A1234BC' } as Prisoner

      prisonerSearchClient.getPrisonerDetails = jest.fn(() => Promise.resolve(prisonerData))

      expect(await service.getPrisonerDetails('A1234BC')).toEqual(prisonerData)
    })
  })
})
