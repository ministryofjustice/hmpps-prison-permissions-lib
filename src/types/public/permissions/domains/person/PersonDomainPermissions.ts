import { CaseNotesPermission, CaseNotesPermissions } from './caseNotes/CaseNotesPermissions'
import { CorePersonRecordPermission, CorePersonRecordPermissions } from './corePersonRecord/CorePersonRecordPermissions'
import {
  PersonProtectedCharacteristicsPermission,
  PersonProtectedCharacteristicsPermissions,
} from './personProtectedCharacteristics/PersonProtectedCharacteristicsPermissions'
import {
  PersonHealthAndMedicationPermission,
  PersonHealthAndMedicationPermissions,
} from './personHealthAndMedication/PersonHealthAndMedicationPermissions'

export interface PersonDomainPermissions {
  caseNotes: CaseNotesPermissions
  corePersonRecord: CorePersonRecordPermissions
  personProtectedCharacteristics: PersonProtectedCharacteristicsPermissions
  personHealthAndMedication: PersonHealthAndMedicationPermissions
}

export type PersonDomainPermission =
  | CaseNotesPermission
  | CorePersonRecordPermission
  | PersonProtectedCharacteristicsPermission
  | PersonHealthAndMedicationPermission
