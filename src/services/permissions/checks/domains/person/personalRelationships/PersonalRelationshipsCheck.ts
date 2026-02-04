import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import baseCheck from '../../../baseCheck/BaseCheck'
import {
  PersonalRelationshipsPermission,
  PersonalRelationshipsPermissions,
} from '../../../../../../types/public/permissions/domains/person/personalRelationships/PersonalRelationshipsPermissions'
import prisonerProfileEditCheck from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheck'
import inUsersCaseLoadAndUserHasSomeRolesFrom from '../../../sharedChecks/inUsersCaseLoadAndUserHasSomeRolesFrom/InUsersCaseLoadAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../types/internal/user/Role'
import prisonerProfileSensitiveEditCheck from '../../../sharedChecks/prisonerProfileSensitiveEditCheck/PrisonerProfileSensitiveEditCheck'
import inUsersCaseLoadAndUserHasRole from '../../../sharedChecks/inUsersCaseLoadAndUserHasRole/InUsersCaseLoadAndUserHasRole'
import { checkWith } from '../../../../utils/PermissionCheckUtils'
import contactsReadCheck from '../../../sharedChecks/contactsReadCheck/contactsReadCheck'

export default function personalRelationshipsCheck(
  context: PrisonerPermissionsContext,
): PersonalRelationshipsPermissions {
  const check = checkWith(context)
  return {
    ...check(PersonalRelationshipsPermission.read_number_of_children, baseCheck),
    ...check(PersonalRelationshipsPermission.edit_number_of_children, prisonerProfileEditCheck),

    ...check(PersonalRelationshipsPermission.read_domestic_status, baseCheck),
    ...check(PersonalRelationshipsPermission.edit_domestic_status, prisonerProfileEditCheck),

    ...check(PersonalRelationshipsPermission.read_emergency_contacts, baseCheck),
    ...check(PersonalRelationshipsPermission.edit_emergency_contacts, prisonerProfileSensitiveEditCheck),

    ...check(PersonalRelationshipsPermission.read_contacts, contactsReadCheck),
    ...check(
      PersonalRelationshipsPermission.edit_contacts,
      inUsersCaseLoadAndUserHasSomeRolesFrom([Role.ContactsAdministrator, Role.ContactsAuthoriser]),
    ),

    ...check(
      PersonalRelationshipsPermission.edit_contact_restrictions,
      inUsersCaseLoadAndUserHasRole(Role.ContactsAuthoriser),
    ),

    ...check(
      PersonalRelationshipsPermission.edit_contact_visit_approval,
      inUsersCaseLoadAndUserHasRole(Role.ContactsAuthoriser),
    ),
  }
}
