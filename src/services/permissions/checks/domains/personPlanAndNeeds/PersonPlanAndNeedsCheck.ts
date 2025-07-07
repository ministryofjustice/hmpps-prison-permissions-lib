import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import personCommunicationNeedsCheck from './personCommunicationNeeds/PersonCommunicationNeedsCheck'
import { PersonPlanAndNeedsDomainPermissions } from '../../../../../types/public/permissions/domains/personPlanAndNeeds/PersonPlanAndNeedsDomainPermissions'

export default function personPlanAndNeedsCheck(request: PermissionsCheckRequest): PersonPlanAndNeedsDomainPermissions {
  return {
    personCommunicationNeeds: personCommunicationNeedsCheck(request),
  }
}
