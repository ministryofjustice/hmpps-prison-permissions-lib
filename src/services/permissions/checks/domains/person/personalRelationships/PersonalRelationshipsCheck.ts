import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import baseCheck from '../../../baseCheck/BaseCheck'
import prisonerProfileSensitiveEditCheck from '../../../sharedChecks/prisonerProfileSensitiveEditCheck/PrisonerProfileSensitiveEditCheck'
import {
  PersonalRelationshipsPermission,
  PersonalRelationshipsPermissions,
} from '../../../../../../types/public/permissions/domains/person/personalRelationships/PersonalRelationshipsPermissions'
import prisonerProfileEditCheck from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheck'

export default function personalRelationshipsCheck(request: PermissionsCheckRequest): PersonalRelationshipsPermissions {
  return {
    ...readCheck(PersonalRelationshipsPermission.read_emergency_contacts, request),
    ...sensitiveEditCheck(PersonalRelationshipsPermission.edit_emergency_contacts, request),

    ...readCheck(PersonalRelationshipsPermission.read_number_of_children, request),
    ...editCheck(PersonalRelationshipsPermission.edit_number_of_children, request),

    ...readCheck(PersonalRelationshipsPermission.read_domestic_status, request),
    ...editCheck(PersonalRelationshipsPermission.edit_domestic_status, request),
  }
}

function readCheck<P extends keyof PersonalRelationshipsPermissions>(
  permission: P,
  request: PermissionsCheckRequest,
): Pick<PersonalRelationshipsPermissions, P> {
  return { [permission]: baseCheck(permission, request) } as Pick<PersonalRelationshipsPermissions, P>
}

function editCheck<P extends keyof PersonalRelationshipsPermissions>(
  permission: P,
  request: PermissionsCheckRequest,
): Pick<PersonalRelationshipsPermissions, P> {
  return { [permission]: prisonerProfileEditCheck(permission, request) } as Pick<PersonalRelationshipsPermissions, P>
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
