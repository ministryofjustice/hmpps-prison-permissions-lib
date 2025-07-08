import { PrisonerBasePermission, PrisonerPermission } from '../types/public/permissions/prisoner/PrisonerPermissions'
import { CaseNotesPermission } from '../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { CorePersonRecordPermission } from '../types/public/permissions/domains/person/corePersonRecord/CorePersonRecordPermissions'
import { PersonalRelationshipsPermission } from '../types/public/permissions/domains/person/personalRelationships/PersonalRelationshipsPermissions'
import { PersonHealthAndMedicationPermission } from '../types/public/permissions/domains/person/personHealthAndMedication/PersonHealthAndMedicationPermissions'
import { PersonProtectedCharacteristicsPermission } from '../types/public/permissions/domains/person/personProtectedCharacteristics/PersonProtectedCharacteristicsPermissions'
import { PersonPrisonCategoryPermission } from '../types/public/permissions/domains/prisonerSpecific/personPrisonCategory/PersonPrisonCategoryPermissions'
import { PrisonerAdjudicationsPermission } from '../types/public/permissions/domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsPermissions'
import { PrisonerAlertsPermission } from '../types/public/permissions/domains/prisonerSpecific/prisonerAlerts/PrisonerAlertsPermissions'
import { PrisonerIncentivesPermission } from '../types/public/permissions/domains/prisonerSpecific/prisonerIncentives/PrisonerIncentivesPermissions'
import { PrisonerMoneyPermission } from '../types/public/permissions/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissions'
import { PrisonerSchedulePermission } from '../types/public/permissions/domains/prisonerSpecific/prisonerSchedule/PrisonerSchedulePermissions'
import { UseOfForcePermission } from '../types/public/permissions/domains/prisonerSpecific/useOfForce/UseOfForcePermissions'
import { ProbationDocumentsPermission } from '../types/public/permissions/domains/probation/probationDocuments/ProbationDocumentsPermissions'
import { PrisonerBaseLocationPermission } from '../types/public/permissions/domains/runningAPrison/prisonerBaseLocation/PrisonerBaseLocationPermissions'
import { PrisonerVisitsAndVisitorsPermission } from '../types/public/permissions/domains/runningAPrison/prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'
import { PathfinderPermission } from '../types/public/permissions/domains/security/pathfinder/PathfinderPermissions'
import { SOCPermission } from '../types/public/permissions/domains/security/soc/SOCPermissions'
import { PersonSentenceCalculationPermission } from '../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { PersonInterventionsPermission } from '../types/public/permissions/domains/interventions/personInterventions/PersonInterventionsPermissions'
import { isGranted } from '../types/public/permissions/prisoner/PrisonerPermissionsUtils'
import { PersonCommunicationNeedsPermission } from '../types/public/permissions/domains/personPlanAndNeeds/personCommunicationNeeds/PersonCommunicationNeedsPermissions'

// Add all permissions enums here to enable them to be referenced in
// nunjucks templates:
const nunjucksEnums: Record<PrisonerPermission, object> = {
  ...nunjucksEnum({ CaseNotesPermission }),
  ...nunjucksEnum({ CorePersonRecordPermission }),
  ...nunjucksEnum({ PathfinderPermission }),
  ...nunjucksEnum({ PersonCommunicationNeedsPermission }),
  ...nunjucksEnum({ PersonHealthAndMedicationPermission }),
  ...nunjucksEnum({ PersonInterventionsPermission }),
  ...nunjucksEnum({ PersonPrisonCategoryPermission }),
  ...nunjucksEnum({ PersonProtectedCharacteristicsPermission }),
  ...nunjucksEnum({ PersonSentenceCalculationPermission }),
  ...nunjucksEnum({ PersonalRelationshipsPermission }),
  ...nunjucksEnum({ PrisonerAdjudicationsPermission }),
  ...nunjucksEnum({ PrisonerAlertsPermission }),
  ...nunjucksEnum({ PrisonerBaseLocationPermission }),
  ...nunjucksEnum({ PrisonerBasePermission }),
  ...nunjucksEnum({ PrisonerIncentivesPermission }),
  ...nunjucksEnum({ PrisonerMoneyPermission }),
  ...nunjucksEnum({ PrisonerSchedulePermission }),
  ...nunjucksEnum({ PrisonerVisitsAndVisitorsPermission }),
  ...nunjucksEnum({ ProbationDocumentsPermission }),
  ...nunjucksEnum({ SOCPermission }),
  ...nunjucksEnum({ UseOfForcePermission }),
}

interface NunjucksEnvironment {
  addGlobal: (name: string, value: unknown) => NunjucksEnvironment
}

export default function setupNunjucksPermissions(njkEnv: NunjucksEnvironment) {
  njkEnv.addGlobal('isGranted', isGranted)
  Object.entries(nunjucksEnums).forEach(([key, value]) => njkEnv.addGlobal(key, value))
}

function nunjucksEnum<T extends Record<string, string>>(object: Record<string, T>): Record<T[keyof T], object> {
  return object
}
