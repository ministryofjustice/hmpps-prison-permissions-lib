import {
  checkCorePersonRecordAccess,
  CorePersonRecordPermission,
  CorePersonRecordPermissions,
  isCorePersonRecordPermission,
} from './CorePersonRecordPermissions'
import {
  isPersonHealthAndMedicationPermission,
  PersonHealthAndMedicationPermission,
  checkPersonHealthAndMedicationAccess,
  PersonHealthAndMedicationPermissions,
} from './PersonHealthAndMedicationPermissions'
import {
  isPersonPersonalRelationshipsPermission,
  checkPersonPersonalRelationshipAccess,
  PersonPersonalRelationshipsPermission,
  PersonPersonalRelationshipsPermissions,
} from './PersonPersonalRelationshipsPermissions'

export interface PersonDomainPermissions {
  // Not a full list, for demonstration purposes at the moment:
  corePersonRecord: CorePersonRecordPermissions
  personHealthAndMedication: PersonHealthAndMedicationPermissions
  personPersonalRelationships: PersonPersonalRelationshipsPermissions
}

export type PersonDomainPermission =
  | CorePersonRecordPermission
  | PersonHealthAndMedicationPermission
  | PersonPersonalRelationshipsPermission

export function isPersonDomainPermission(permission: string, permissions: PersonDomainPermissions) {
  return (
    isCorePersonRecordPermission(permission, permissions.corePersonRecord) ||
    isPersonHealthAndMedicationPermission(permission, permissions.personHealthAndMedication) ||
    isPersonPersonalRelationshipsPermission(permission, permissions.personPersonalRelationships)
  )
}

export function checkPersonDomainAccess(
  permission: PersonDomainPermission,
  permissions: PersonDomainPermissions,
): boolean {
  if (isCorePersonRecordPermission(permission, permissions.corePersonRecord)) {
    return checkCorePersonRecordAccess(permission as CorePersonRecordPermission, permissions.corePersonRecord)
  }

  if (isPersonHealthAndMedicationPermission(permission, permissions.personHealthAndMedication)) {
    return checkPersonHealthAndMedicationAccess(
      permission as PersonHealthAndMedicationPermission,
      permissions.personHealthAndMedication,
    )
  }

  if (isPersonPersonalRelationshipsPermission(permission, permissions.personPersonalRelationships)) {
    return checkPersonPersonalRelationshipAccess(
      permission as PersonPersonalRelationshipsPermission,
      permissions.personPersonalRelationships,
    )
  }

  return false
}
