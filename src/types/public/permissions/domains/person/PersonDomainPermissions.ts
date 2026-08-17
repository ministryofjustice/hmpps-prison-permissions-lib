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
import { XRayBodyScansPermission, XRayBodyScansPermissions } from './xRayBodyScans/XRayBodyScansPermissions'

export interface PersonDomainPermissions {
  caseNotes: CaseNotesPermissions
  corePersonRecord: CorePersonRecordPermissions
  personProtectedCharacteristics: PersonProtectedCharacteristicsPermissions
  personHealthAndMedication: PersonHealthAndMedicationPermissions
  personalRelationships: PersonalRelationshipsPermissions
  xRayBodyScans: XRayBodyScansPermissions
}

export type PersonDomainPermission =
  | CaseNotesPermission
  | CorePersonRecordPermission
  | PersonProtectedCharacteristicsPermission
  | PersonHealthAndMedicationPermission
  | PersonalRelationshipsPermission
  | XRayBodyScansPermission
