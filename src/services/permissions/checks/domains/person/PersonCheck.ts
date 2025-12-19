import PermissionsCheckContext from '../../PermissionsCheckContext'
import caseNotesCheck from './caseNotes/CaseNotesCheck'
import { PersonDomainPermissions } from '../../../../../types/public/permissions/domains/person/PersonDomainPermissions'
import corePersonRecordCheck from './corePersonRecord/CorePersonRecordCheck'
import personProtectedCharacteristicsCheck from './personProtectedCharacteristics/PersonProtectedCharacteristicsCheck'
import personHealthAndMedicationCheck from './personHealthAndMedication/PersonHealthAndMedicationCheck'
import personalRelationshipsCheck from './personalRelationships/PersonalRelationshipsCheck'

export default function personCheck(context: PermissionsCheckContext): PersonDomainPermissions {
  return {
    caseNotes: caseNotesCheck(context),
    corePersonRecord: corePersonRecordCheck(context),
    personProtectedCharacteristics: personProtectedCharacteristicsCheck(context),
    personHealthAndMedication: personHealthAndMedicationCheck(context),
    personalRelationships: personalRelationshipsCheck(context),
  }
}
