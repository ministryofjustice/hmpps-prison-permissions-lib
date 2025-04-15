export enum PersonHealthAndMedicationPermission {
  read_pregnancy = 'prisoner:person-health-and-medication:pregnancy:read',
  read_type_of_diet = 'prisoner:person-health-and-medication:type-of-diet',
}

export interface PersonHealthAndMedicationPermissions {
  // Not a full list, for demonstration purposes at the moment:
  [PersonHealthAndMedicationPermission.read_pregnancy]: boolean
  [PersonHealthAndMedicationPermission.read_type_of_diet]: boolean
}

export function isPersonHealthAndMedicationPermission(
  permission: string,
  permissions: PersonHealthAndMedicationPermissions,
) {
  return permission in permissions
}

export function checkPersonHealthAndMedicationAccess(
  permission: PersonHealthAndMedicationPermission,
  permissions: PersonHealthAndMedicationPermissions,
): boolean {
  return permissions[permission]
}
