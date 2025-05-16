import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import caseNotesCheck from './caseNotes/CaseNotesCheck'
import { PersonDomainPermissions } from '../../../../../types/public/permissions/domains/person/PersonDomainPermissions'
import corePersonRecordCheck from './corePersonRecord/CorePersonRecordCheck'
import personProtectedCharacteristicsCheck from './personProtectedCharacteristics/PersonProtectedCharacteristicsCheck'
import personHealthAndMedicationCheck from './personHealthAndMedication/PersonHealthAndMedicationCheck'

export default function personCheck(request: PermissionsCheckRequest): PersonDomainPermissions {
  return {
    caseNotes: caseNotesCheck(request),
    corePersonRecord: corePersonRecordCheck(request),
    personProtectedCharacteristics: personProtectedCharacteristicsCheck(request),
    personHealthAndMedication: personHealthAndMedicationCheck(request),
  }
}
