import PermissionsCheckContext from '../../../PermissionsCheckContext'
import baseCheck from '../../../baseCheck/BaseCheck'
import prisonerProfileEditCheck from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheck'
import {
  PersonCommunicationNeedsPermission,
  PersonCommunicationNeedsPermissions,
} from '../../../../../../types/public/permissions/domains/personPlanAndNeeds/personCommunicationNeeds/PersonCommunicationNeedsPermissions'

export default function personCommunicationNeedsCheck(
  request: PermissionsCheckContext,
): PersonCommunicationNeedsPermissions {
  return {
    ...readCheck(PersonCommunicationNeedsPermission.read_language, request),
    ...editCheck(PersonCommunicationNeedsPermission.edit_language, request),
  }
}

function readCheck<P extends keyof PersonCommunicationNeedsPermissions>(
  permission: P,
  request: PermissionsCheckContext,
): Pick<PersonCommunicationNeedsPermissions, P> {
  return { [permission]: baseCheck(permission, request) } as Pick<PersonCommunicationNeedsPermissions, P>
}

function editCheck<P extends keyof PersonCommunicationNeedsPermissions>(
  permission: P,
  request: PermissionsCheckContext,
): Pick<PersonCommunicationNeedsPermissions, P> {
  return { [permission]: prisonerProfileEditCheck(permission, request) } as Pick<PersonCommunicationNeedsPermissions, P>
}
