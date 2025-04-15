import {
  isPersonCourtSchedulesPermission,
  personCourtSchedulesPermission,
  PersonCourtSchedulesPermission,
  PersonCourtSchedulesPermissions,
} from './PersonCourtSchedulesPermissions'
import { Operations, noAccess } from '../../Operations'

export interface CourtAndLegalDomainPermissions {
  // Not a full list, for demonstration purposes at the moment:
  personCourtSchedules: PersonCourtSchedulesPermissions
}

export type CourtAndLegalDomainPermission = PersonCourtSchedulesPermission

export function isCourtAndLegalDomainPermission(permission: string, permissions: CourtAndLegalDomainPermissions) {
  return isPersonCourtSchedulesPermission(permission, permissions.personCourtSchedules)
}

export function courtAndLegalDomainPermission(
  permission: CourtAndLegalDomainPermission,
  permissions: CourtAndLegalDomainPermissions,
): Operations {
  if (isPersonCourtSchedulesPermission(permission, permissions.personCourtSchedules)) {
    return personCourtSchedulesPermission(
      permission as PersonCourtSchedulesPermission,
      permissions.personCourtSchedules,
    )
  }

  return noAccess()
}
