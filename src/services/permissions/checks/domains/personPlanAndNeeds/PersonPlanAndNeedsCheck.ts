import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'
import personCommunicationNeedsCheck from './personCommunicationNeeds/PersonCommunicationNeedsCheck'
import { PersonPlanAndNeedsDomainPermissions } from '../../../../../types/public/permissions/domains/personPlanAndNeeds/PersonPlanAndNeedsDomainPermissions'

export default function personPlanAndNeedsCheck(
  context: PrisonerPermissionsContext,
): PersonPlanAndNeedsDomainPermissions {
  return {
    personCommunicationNeeds: personCommunicationNeedsCheck(context),
  }
}
