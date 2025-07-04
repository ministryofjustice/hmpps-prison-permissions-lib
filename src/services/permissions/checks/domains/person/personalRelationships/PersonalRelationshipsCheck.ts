import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import baseCheck from '../../../baseCheck/BaseCheck'
import prisonerProfileSensitiveEditCheck from '../../../sharedChecks/prisonerProfileSensitiveEditCheck/PrisonerProfileSensitiveEditCheck'
import {
  PersonalRelationshipsPermission,
  PersonalRelationshipsPermissions,
} from '../../../../../../types/public/permissions/domains/person/personalRelationships/PersonalRelationshipsPermissions'

export default function personalRelationshipsCheck(request: PermissionsCheckRequest): PersonalRelationshipsPermissions {
  return {
    ...readCheck(PersonalRelationshipsPermission.read_emergency_contacts, request),
    ...sensitiveEditCheck(PersonalRelationshipsPermission.edit_emergency_contacts, request),
  }
}

function readCheck<P extends keyof PersonalRelationshipsPermissions>(
  permission: P,
  request: PermissionsCheckRequest,
): Pick<PersonalRelationshipsPermissions, P> {
  return { [permission]: baseCheck(permission, request) } as Pick<PersonalRelationshipsPermissions, P>
}

function sensitiveEditCheck<P extends keyof PersonalRelationshipsPermissions>(
  permission: P,
  request: PermissionsCheckRequest,
): Pick<PersonalRelationshipsPermissions, P> {
  return { [permission]: prisonerProfileSensitiveEditCheck(permission, request) } as Pick<
    PersonalRelationshipsPermissions,
    P
  >
}
