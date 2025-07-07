import {
  PersonCommunicationNeedsPermission,
  PersonCommunicationNeedsPermissions,
} from './personCommunicationNeeds/PersonCommunicationNeedsPermissions'

export interface PersonPlanAndNeedsDomainPermissions {
  personCommunicationNeeds: PersonCommunicationNeedsPermissions
}

export type PersonPlanAndNeedsDomainPermission = PersonCommunicationNeedsPermission
