import {
  isPersonCommunicationNeedsPermission,
  PersonCommunicationNeedsPermission,
  checkPersonCommunicationNeedsAccess,
  PersonCommunicationNeedsPermissions,
} from './PersonCommunicationNeedsPermissions'

export interface PersonPlanAndNeedsDomainPermissions {
  // Not a full list, for demonstration purposes at the moment:
  personCommunicationNeeds: PersonCommunicationNeedsPermissions
}

export type PersonPlanAndNeedsDomainPermission = PersonCommunicationNeedsPermission

export function isPersonPlanAndNeedsDomainPermission(
  permission: string,
  permissions: PersonPlanAndNeedsDomainPermissions,
) {
  return isPersonCommunicationNeedsPermission(permission, permissions.personCommunicationNeeds)
}

export function checkPersonPlanAndNeedsDomainAccess(
  permission: PersonPlanAndNeedsDomainPermission,
  permissions: PersonPlanAndNeedsDomainPermissions,
): boolean {
  if (isPersonCommunicationNeedsPermission(permission, permissions.personCommunicationNeeds)) {
    return checkPersonCommunicationNeedsAccess(permission, permissions.personCommunicationNeeds)
  }

  return false
}
