import { Operations } from '../../Operations'

export enum PersonCourtSchedulesPermission {
  schedule = 'prisoner:person-court-schedule:schedule',
}

export interface PersonCourtSchedulesPermissions {
  // Not a full list, for demonstration purposes at the moment:
  [PersonCourtSchedulesPermission.schedule]: Operations
}

export function isPersonCourtSchedulesPermission(permission: string, permissions: PersonCourtSchedulesPermissions) {
  return permission in permissions
}

export function personCourtSchedulesPermission(
  permission: PersonCourtSchedulesPermission,
  permissions: PersonCourtSchedulesPermissions,
): Operations {
  return permissions[permission]
}
