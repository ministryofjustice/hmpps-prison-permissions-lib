import { PrisonerBasePermission } from '../../types/public/permissions/prisoner/PrisonerPermissions'
import { scenarioTests } from '../../testUtils/TestScenario'
import { PersonSentenceCalculationPermission } from '../../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { baseCheckScenarios } from './scenarios/baseCheck/BaseCheckScenarios'
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
import { CorePersonRecordPermission } from '../../types/public/permissions/domains/person/corePersonRecord/CorePersonRecordPermissions'
import { prisonerProfileEditCheckScenarios } from './scenarios/shared/PrisonerProfileEditCheckScenarios'
import { PersonHealthAndMedicationPermission } from '../../types/public/permissions/domains/person/personHealthAndMedication/PersonHealthAndMedicationPermissions'
import { dietEditScenarios } from '../../services/permissions/checks/domains/person/personHealthAndMedication/dietEdit/DietEditScenarios'
import { PersonProtectedCharacteristicsPermission } from '../../types/public/permissions/domains/person/personProtectedCharacteristics/PersonProtectedCharacteristicsPermissions'
import { prisonerProfileSensitiveEditCheckScenarios } from '../../services/permissions/checks/sharedChecks/prisonerProfileSensitiveEditCheck/PrisonerProfileSensitiveEditCheckScenarios'

/**
 * Please contact #connect-dps-devs if any of these tests break
 * due to permissions changes since this will affect the Prisoner Profile.
 */
describe('Prisoner Profile Contract Tests', () => {
  describe('Base check', () => {
    scenarioTests<PrisonerBasePermission>({ [PrisonerBasePermission.read]: baseCheckScenarios })
  })

  describe('Domains', () => {
    describe('Interventions', () => {
      describe('Person Interventions', () => {
        scenarioTests<PersonInterventionsPermission>({ [PersonInterventionsPermission.read_csip]: csipReadScenarios })
      })
    })

    describe('Person', () => {
      describe('Case Notes', () => {
        scenarioTests<CaseNotesPermission>({
          [CaseNotesPermission.read]: caseNotesReadAndEditScenarios,
          [CaseNotesPermission.edit]: caseNotesReadAndEditScenarios,
          [CaseNotesPermission.read_sensitive]: sensitiveCaseNotesReadScenarios,
          [CaseNotesPermission.delete_sensitive]: sensitiveCaseNotesDeleteScenarios,
          [CaseNotesPermission.edit_sensitive]: sensitiveCaseNotesEditScenarios,
        })
      })

      describe('Core Person Record', () => {
        scenarioTests<CorePersonRecordPermission>({
          [CorePersonRecordPermission.read_physical_characteristics]: baseCheckScenarios,
          [CorePersonRecordPermission.edit_physical_characteristics]: prisonerProfileEditCheckScenarios,
          [CorePersonRecordPermission.read_photo]: baseCheckScenarios,
          [CorePersonRecordPermission.edit_photo]: prisonerProfileSensitiveEditCheckScenarios,
          [CorePersonRecordPermission.read_place_of_birth]: baseCheckScenarios,
          [CorePersonRecordPermission.edit_place_of_birth]: prisonerProfileSensitiveEditCheckScenarios,
          [CorePersonRecordPermission.read_military_history]: baseCheckScenarios,
          [CorePersonRecordPermission.edit_military_history]: prisonerProfileEditCheckScenarios,
          [CorePersonRecordPermission.read_name_and_aliases]: baseCheckScenarios,
          [CorePersonRecordPermission.edit_name_and_aliases]: prisonerProfileSensitiveEditCheckScenarios,
          [CorePersonRecordPermission.read_date_of_birth]: baseCheckScenarios,
          [CorePersonRecordPermission.edit_date_of_birth]: prisonerProfileSensitiveEditCheckScenarios,
          [CorePersonRecordPermission.read_address]: baseCheckScenarios,
          [CorePersonRecordPermission.edit_address]: prisonerProfileSensitiveEditCheckScenarios,
          [CorePersonRecordPermission.read_nationality]: baseCheckScenarios,
          [CorePersonRecordPermission.edit_nationality]: prisonerProfileSensitiveEditCheckScenarios,
          [CorePersonRecordPermission.read_identifiers]: baseCheckScenarios,
          [CorePersonRecordPermission.edit_identifiers]: prisonerProfileSensitiveEditCheckScenarios,
          [CorePersonRecordPermission.read_phone_numbers]: baseCheckScenarios,
          [CorePersonRecordPermission.edit_phone_numbers]: prisonerProfileSensitiveEditCheckScenarios,
          [CorePersonRecordPermission.read_email_addresses]: baseCheckScenarios,
          [CorePersonRecordPermission.edit_email_addresses]: prisonerProfileSensitiveEditCheckScenarios,
          [CorePersonRecordPermission.read_distinguishing_marks]: baseCheckScenarios,
          [CorePersonRecordPermission.edit_distinguishing_marks]: prisonerProfileSensitiveEditCheckScenarios,
          [CorePersonRecordPermission.read_emergency_contacts]: baseCheckScenarios,
          [CorePersonRecordPermission.edit_emergency_contacts]: prisonerProfileSensitiveEditCheckScenarios,
        })
      })

      describe('Person Protected Characteristics', () => {
        scenarioTests<PersonProtectedCharacteristicsPermission>({
          [PersonProtectedCharacteristicsPermission.read_sexual_orientation]: baseCheckScenarios,
          [PersonProtectedCharacteristicsPermission.edit_sexual_orientation]: prisonerProfileEditCheckScenarios,
          [PersonProtectedCharacteristicsPermission.read_religion_and_belief]: baseCheckScenarios,
          [PersonProtectedCharacteristicsPermission.edit_religion_and_belief]: prisonerProfileEditCheckScenarios,
          [PersonProtectedCharacteristicsPermission.read_ethnicity]: baseCheckScenarios,
          [PersonProtectedCharacteristicsPermission.edit_ethnicity]: prisonerProfileSensitiveEditCheckScenarios,
        })
      })

      describe('Person Health And Medication', () => {
        scenarioTests<PersonHealthAndMedicationPermission>({
          [PersonHealthAndMedicationPermission.read_pregnancy]: baseCheckScenarios,
          [PersonHealthAndMedicationPermission.edit_pregnancy]: prisonerProfileEditCheckScenarios,
          [PersonHealthAndMedicationPermission.read_smoker]: baseCheckScenarios,
          [PersonHealthAndMedicationPermission.edit_smoker]: prisonerProfileEditCheckScenarios,
          [PersonHealthAndMedicationPermission.read_diet]: baseCheckScenarios,
          [PersonHealthAndMedicationPermission.edit_diet]: dietEditScenarios,
        })
      })
    })

    describe('Prisoner Specific', () => {
      describe('Person Prison Category', () => {
        scenarioTests<PersonPrisonCategoryPermission>({
          [PersonPrisonCategoryPermission.edit]: personPrisonCategoryEditScenarios,
        })
      })

      describe('Prisoner Adjudications', () => {
        scenarioTests<PrisonerAdjudicationsPermission>({
          [PrisonerAdjudicationsPermission.read]: prisonerAdjudicationsReadPrisonerProfileScenarios,
        })
      })

      describe('Prisoner Incentives', () => {
        scenarioTests<PrisonerIncentivesPermission>({
          [PrisonerIncentivesPermission.read]: prisonerIncentivesReadScenarios,
        })
      })

      describe('Prisoner Money', () => {
        scenarioTests<PrisonerMoneyPermission>({ [PrisonerMoneyPermission.read]: prisonerMoneyReadScenarios })
      })

      describe('Prisoner Schedule', () => {
        scenarioTests<PrisonerSchedulePermission>({
          [PrisonerSchedulePermission.edit_appointment]: prisonerAppointmentEditScenarios,
          [PrisonerSchedulePermission.edit_activity]: prisonerActivityEditScenarios,
        })
      })

      describe('Use of Force', () => {
        scenarioTests<UseOfForcePermission>({ [UseOfForcePermission.edit]: useOfForceEditScenarios })
      })

      describe('Prisoner Alerts', () => {
        scenarioTests<PrisonerAlertsPermission>({ [PrisonerAlertsPermission.edit]: prisonerAlertsEditScenarios })
      })
    })

    describe('Probation', () => {
      describe('Probation Documents', () => {
        scenarioTests<ProbationDocumentsPermission>({
          [ProbationDocumentsPermission.read]: probationDocumentsReadScenarios,
        })
      })
    })

    describe('Running A Prison', () => {
      describe('Prisoner Visits and Visitors', () => {
        scenarioTests<PrisonerVisitsAndVisitorsPermission>({
          [PrisonerVisitsAndVisitorsPermission.read]: prisonerVisitsAndVisitorsReadScenarios,
        })
      })

      describe('Prisoner Base Location', () => {
        scenarioTests<PrisonerBaseLocationPermission>({
          [PrisonerBaseLocationPermission.read_location_details]: locationDetailsAndHistoryReadScenarios,
          [PrisonerBaseLocationPermission.read_location_history]: locationDetailsAndHistoryReadScenarios,
          [PrisonerBaseLocationPermission.move_cell]: moveCellScenarios,
        })
      })
    })

    describe('Security', () => {
      describe('Pathfinder', () => {
        scenarioTests<PathfinderPermission>({
          [PathfinderPermission.read]: pathfinderReadScenarios,
          [PathfinderPermission.edit]: pathfinderEditScenarios,
        })
      })

      describe('SOC', () => {
        scenarioTests<SOCPermission>({ [SOCPermission.read]: socReadScenarios, [SOCPermission.edit]: socEditScenarios })
      })
    })

    describe('Sentence / Offence', () => {
      describe('Person Sentence Calculation', () => {
        scenarioTests<PersonSentenceCalculationPermission>({
          [PersonSentenceCalculationPermission.read]: sentenceCalculationReadScenarios,
          [PersonSentenceCalculationPermission.edit_adjustments]: sentenceCalculationEditAdjustmentScenarios,
        })
      })
    })
  })
})
