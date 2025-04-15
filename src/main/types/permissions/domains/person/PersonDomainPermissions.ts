import {
  corePersonRecordPermission,
  CorePersonRecordPermission,
  CorePersonRecordPermissions,
  isCorePersonRecordPermission,
} from './CorePersonRecordPermissions'
import {
  isPersonHealthAndMedicationPermission,
  PersonHealthAndMedicationPermission,
  personHealthAndMedicationPermission,
  PersonHealthAndMedicationPermissions,
} from './PersonHealthAndMedicationPermissions'
import {
  isPersonPersonalRelationshipsPermission,
  personPersonalRelationshipPermission,
  PersonPersonalRelationshipsPermission,
  PersonPersonalRelationshipsPermissions,
} from './PersonPersonalRelationshipsPermissions'
import { Operations, noAccess } from '../../Operations'

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

export function personDomainPermission(
  permission: PersonDomainPermission,
  permissions: PersonDomainPermissions,
): Operations {
  if (isCorePersonRecordPermission(permission, permissions.corePersonRecord)) {
    return corePersonRecordPermission(permission as CorePersonRecordPermission, permissions.corePersonRecord)
  }

  if (isPersonHealthAndMedicationPermission(permission, permissions.personHealthAndMedication)) {
    return personHealthAndMedicationPermission(
      permission as PersonHealthAndMedicationPermission,
      permissions.personHealthAndMedication,
    )
  }

  if (isPersonPersonalRelationshipsPermission(permission, permissions.personPersonalRelationships)) {
    return personPersonalRelationshipPermission(
      permission as PersonPersonalRelationshipsPermission,
      permissions.personPersonalRelationships,
    )
  }

  return noAccess()
}
