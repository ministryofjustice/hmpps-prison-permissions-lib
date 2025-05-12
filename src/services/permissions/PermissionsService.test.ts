import PermissionsService from './PermissionsService'
import PrisonerSearchClient from '../../data/hmppsPrisonerSearch/PrisonerSearchClient'
import PermissionsLogger from './PermissionsLogger'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PrisonerBasePermission } from '../../types/permissions/prisoner/PrisonerPermissions'
import { scenarioTest } from '../../testUtils/TestScenario'
import { baseCheckScenarios } from './checks/baseCheck/BaseCheckTestScenarios'
import { PersonSentenceCalculationPermission } from '../../types/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { sentenceCalculationReadScenarios } from './checks/domains/sentenceAndOffence/personSentenceCalculation/sentenceCalculationRead/SentenceCalculationReadScenarios'
import { sentenceCalculationEditAdjustmentScenarios } from './checks/domains/sentenceAndOffence/personSentenceCalculation/sentenceCalculationAdjustmentEdit/SentenceCalculationEditAdjustmentScenarios'
import { PrisonerMoneyPermission } from '../../types/permissions/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissions'
import { prisonerMoneyReadScenarios } from './checks/domains/prisonerSpecific/prisonerMoney/prisonerMoneyRead/PrisonerMoneyReadScenarios'
import { prisonerAdjudicationsReadScenarios } from './checks/domains/prisonerSpecific/prisonerAdjudications/prisonerAdjudicationsRead/PrisonerAdjudicationsReadScenarios'
import { PrisonerAdjudicationsPermission } from '../../types/permissions/domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsPermissions'
import { prisonerVisitsAndVisitorsReadScenarios } from './checks/domains/runningAPrison/prisonerVisitsAndVisitors/prisonerVisitsAndVisitorsRead/PrisonerVisitsAndVisitorsReadScenarios'
import { PrisonerVisitsAndVisitorsPermission } from '../../types/permissions/domains/runningAPrison/prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'
import { prisonerIncentivesReadScenarios } from './checks/domains/prisonerSpecific/prisonerIncentives/prisonerIncentivesRead/PrisonerIncentivesReadScenarios'
import { PrisonerIncentivesPermission } from '../../types/permissions/domains/prisonerSpecific/prisonerIncentives/PrisonerIncentivesPermissions'
import { personPrisonCategoryEditScenarios } from './checks/domains/prisonerSpecific/personPrisonCategory/personPrisonCategoryEdit/PersonPrisonCategoryEditScenarios'
import { PersonPrisonCategoryPermission } from '../../types/permissions/domains/prisonerSpecific/personPrisonCategory/PersonPrisonCategoryPermissions'
import { caseNotesReadScenarios } from './checks/domains/person/caseNotes/caseNotesRead/CaseNotesReadScenarios'
import { CaseNotesPermission } from '../../types/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { sensitiveCaseNotesReadScenarios } from './checks/domains/person/caseNotes/sensitiveCaseNotesRead/SensitiveCaseNotesReadScenarios'
import { sensitiveCaseNotesDeleteScenarios } from './checks/domains/person/caseNotes/sensitiveCaseNotesDelete/SensitiveCaseNotesDeleteScenarios'
import { sensitiveCaseNotesEditScenarios } from './checks/domains/person/caseNotes/sensitiveCaseNotesEdit/SensitiveCaseNotesEditScenarios'
import { caseNotesEditScenarios } from './checks/domains/person/caseNotes/caseNotesEdit/CaseNotesEditScenarios'
import { useOfForceEditScenarios } from './checks/domains/prisonerSpecific/useOfForce/useOfForceEdit/UseOfForceEditScenarios'
import { UseOfForcePermission } from '../../types/permissions/domains/prisonerSpecific/useOfForce/UseOfForcePermissions'
import { PrisonerSchedulePermission } from '../../types/permissions/domains/prisonerSpecific/prisonerSchedule/PrisonerSchedulePermissions'
import { prisonerActivityEditScenarios } from './checks/domains/prisonerSpecific/prisonerSchedule/prisonerActivityEdit/PrisonerActivityEditScenarios'
import { prisonerAppointmentEditScenarios } from './checks/domains/prisonerSpecific/prisonerSchedule/prisonerAppointmentEdit/PrisonerAppointmentEditScenarios'
import { pathfinderReadScenarios } from './checks/domains/security/pathfinder/pathfinderRead/PathfinderReadScenarios'
import { PathfinderPermission } from '../../types/permissions/domains/security/pathfinder/PathfinderPermissions'
import { pathfinderEditScenarios } from './checks/domains/security/pathfinder/pathfinderEdit/PathfinderEditScenarios'
import { socReadScenarios } from './checks/domains/security/soc/socRead/SOCReadScenarios'
import { SOCPermission } from '../../types/permissions/domains/security/soc/SOCPermissions'
import { socEditScenarios } from './checks/domains/security/soc/socEdit/SocEditScenarios'

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
      })

      describe('Running a Prison', () => {
        describe('Prisoner Visits and Visitors', () => {
          scenarioTest(prisonerVisitsAndVisitorsReadScenarios, PrisonerVisitsAndVisitorsPermission.read)
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
