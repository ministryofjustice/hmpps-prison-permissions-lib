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
import {
  PersonalRelationshipsPermission,
  PersonalRelationshipsPermissions,
} from './personalRelationships/PersonalRelationshipsPermissions'

export interface PersonDomainPermissions {
  caseNotes: CaseNotesPermissions
  corePersonRecord: CorePersonRecordPermissions
  personProtectedCharacteristics: PersonProtectedCharacteristicsPermissions
  personHealthAndMedication: PersonHealthAndMedicationPermissions
  personalRelationships: PersonalRelationshipsPermissions
}

export type PersonDomainPermission =
  | CaseNotesPermission
  | CorePersonRecordPermission
  | PersonProtectedCharacteristicsPermission
  | PersonHealthAndMedicationPermission
  | PersonalRelationshipsPermission
