import PermissionsCheckContext from '../../PermissionsCheckContext'
import personCommunicationNeedsCheck from './personCommunicationNeeds/PersonCommunicationNeedsCheck'
import { PersonPlanAndNeedsDomainPermissions } from '../../../../../types/public/permissions/domains/personPlanAndNeeds/PersonPlanAndNeedsDomainPermissions'

export default function personPlanAndNeedsCheck(request: PermissionsCheckContext): PersonPlanAndNeedsDomainPermissions {
  return {
    personCommunicationNeeds: personCommunicationNeedsCheck(request),
  }
}
