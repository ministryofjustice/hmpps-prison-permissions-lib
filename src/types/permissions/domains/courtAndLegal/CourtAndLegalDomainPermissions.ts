import {
  isPersonCourtSchedulesPermission,
  checkPersonCourtSchedulesAccess,
  PersonCourtSchedulesPermission,
  PersonCourtSchedulesPermissions,
} from './PersonCourtSchedulesPermissions'

export interface CourtAndLegalDomainPermissions {
  // Not a full list, for demonstration purposes at the moment:
  personCourtSchedules: PersonCourtSchedulesPermissions
}

export type CourtAndLegalDomainPermission = PersonCourtSchedulesPermission

export function isCourtAndLegalDomainPermission(permission: string, permissions: CourtAndLegalDomainPermissions) {
  return isPersonCourtSchedulesPermission(permission, permissions.personCourtSchedules)
}

export function checkCourtAndLegalDomainAccess(
  permission: CourtAndLegalDomainPermission,
  permissions: CourtAndLegalDomainPermissions,
): boolean {
  if (isPersonCourtSchedulesPermission(permission, permissions.personCourtSchedules)) {
    return checkPersonCourtSchedulesAccess(
      permission as PersonCourtSchedulesPermission,
      permissions.personCourtSchedules,
    )
  }

  return false
}
