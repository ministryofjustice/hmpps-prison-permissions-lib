import PermissionsCheckContext from '../../../PermissionsCheckContext'
import baseCheck from '../../../baseCheck/BaseCheck'
import {
  PersonalRelationshipsPermission,
  PersonalRelationshipsPermissions,
} from '../../../../../../types/public/permissions/domains/person/personalRelationships/PersonalRelationshipsPermissions'
import prisonerProfileEditCheck from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheck'
import inUsersCaseLoad from '../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoad'
import inUsersCaseLoadAndUserHasSomeRolesFrom from '../../../sharedChecks/inUsersCaseLoadAndUserHasSomeRolesFrom/InUsersCaseLoadAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../types/internal/user/Role'
import prisonerProfileSensitiveEditCheck from '../../../sharedChecks/prisonerProfileSensitiveEditCheck/PrisonerProfileSensitiveEditCheck'
import inUsersCaseLoadAndUserHasRole from '../../../sharedChecks/inUsersCaseLoadAndUserHasRole/InUsersCaseLoadAndUserHasRole'

export default function personalRelationshipsCheck(request: PermissionsCheckContext): PersonalRelationshipsPermissions {
  return {
    ...readCheck(PersonalRelationshipsPermission.read_number_of_children, request),
    ...editCheck(PersonalRelationshipsPermission.edit_number_of_children, request),

    ...readCheck(PersonalRelationshipsPermission.read_domestic_status, request),
    ...editCheck(PersonalRelationshipsPermission.edit_domestic_status, request),

    ...readCheck(PersonalRelationshipsPermission.read_emergency_contacts, request),
    ...sensitiveEditCheck(PersonalRelationshipsPermission.edit_emergency_contacts, request),

    [PersonalRelationshipsPermission.read_contacts]: inUsersCaseLoad(
      PersonalRelationshipsPermission.read_contacts,
      request,
    ),

    [PersonalRelationshipsPermission.edit_contacts]: inUsersCaseLoadAndUserHasSomeRolesFrom(
      [Role.ContactsAdministrator, Role.ContactsAuthoriser],
      PersonalRelationshipsPermission.edit_contacts,
      request,
    ),

    [PersonalRelationshipsPermission.edit_contact_restrictions]: inUsersCaseLoadAndUserHasRole(
      Role.ContactsAuthoriser,
      PersonalRelationshipsPermission.edit_contact_restrictions,
      request,
    ),

    [PersonalRelationshipsPermission.edit_contact_visit_approval]: inUsersCaseLoadAndUserHasRole(
      Role.ContactsAuthoriser,
      PersonalRelationshipsPermission.edit_contact_visit_approval,
      request,
    ),
  }
}

function readCheck<P extends keyof PersonalRelationshipsPermissions>(
  permission: P,
  request: PermissionsCheckContext,
): Pick<PersonalRelationshipsPermissions, P> {
  return { [permission]: baseCheck(permission, request) } as Pick<PersonalRelationshipsPermissions, P>
}

function editCheck<P extends keyof PersonalRelationshipsPermissions>(
  permission: P,
  request: PermissionsCheckContext,
): Pick<PersonalRelationshipsPermissions, P> {
  return { [permission]: prisonerProfileEditCheck(permission, request) } as Pick<PersonalRelationshipsPermissions, P>
}

function sensitiveEditCheck<P extends keyof PersonalRelationshipsPermissions>(
  permission: P,
  request: PermissionsCheckContext,
): Pick<PersonalRelationshipsPermissions, P> {
  return { [permission]: prisonerProfileSensitiveEditCheck(permission, request) } as Pick<
    PersonalRelationshipsPermissions,
    P
  >
}
