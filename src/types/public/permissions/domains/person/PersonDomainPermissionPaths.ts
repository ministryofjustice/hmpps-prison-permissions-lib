import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { Path } from '../../../../internal/utils/Path'
import { caseNotesPermissionPaths } from './caseNotes/CaseNotesPermissionPaths'
import { PersonDomainPermission } from './PersonDomainPermissions'
import { corePersonRecordPermissionPaths } from './corePersonRecord/CorePersonRecordPermissionPaths'
import { personProtectedCharacteristicsPermissionPaths } from './personProtectedCharacteristics/PersonProtectedCharacteristicsPermissionPaths'
import { personHealthAndMedicationPermissionPaths } from './personHealthAndMedication/PersonHealthAndMedicationPermissionPaths'

// eslint-disable-next-line import/prefer-default-export
export const personDomainPermissionPaths: Record<PersonDomainPermission, Path<PrisonerPermissions>> = {
  ...caseNotesPermissionPaths,
  ...corePersonRecordPermissionPaths,
  ...personProtectedCharacteristicsPermissionPaths,
  ...personHealthAndMedicationPermissionPaths,
}
