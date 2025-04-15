import { Operations } from '../../Operations'

export enum PersonHealthAndMedicationPermission {
  pregnancy = 'prisoner:person-health-and-medication:pregnancy',
  typeOfDiet = 'prisoner:person-health-and-medication:type-of-diet',
}

export interface PersonHealthAndMedicationPermissions {
  // Not a full list, for demonstration purposes at the moment:
  [PersonHealthAndMedicationPermission.pregnancy]: Operations
  [PersonHealthAndMedicationPermission.typeOfDiet]: Operations
}

export function isPersonHealthAndMedicationPermission(
  permission: string,
  permissions: PersonHealthAndMedicationPermissions,
) {
  return permission in permissions
}

export function personHealthAndMedicationPermission(
  permission: PersonHealthAndMedicationPermission,
  permissions: PersonHealthAndMedicationPermissions,
): Operations {
  return permissions[permission]
}
