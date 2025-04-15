import {
  isPersonCommunicationNeedsPermission,
  PersonCommunicationNeedsPermission,
  personCommunicationNeedsPermission,
  PersonCommunicationNeedsPermissions,
} from './PersonCommunicationNeedsPermissions'
import { Operations, noAccess } from '../../Operations'

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

export function personPlanAndNeedsDomainPermission(
  permission: PersonPlanAndNeedsDomainPermission,
  permissions: PersonPlanAndNeedsDomainPermissions,
): Operations {
  if (isPersonCommunicationNeedsPermission(permission, permissions.personCommunicationNeeds)) {
    return personCommunicationNeedsPermission(permission, permissions.personCommunicationNeeds)
  }

  return noAccess()
}
