import { PersonalRelationshipsPermission } from '../../../../../../types/public/permissions/domains/person/personalRelationships/PersonalRelationshipsPermissions'
import { baseCheckScenarios } from '../../../baseCheck/BaseCheckScenarios'
import { prisonerProfileEditCheckScenarios } from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheckScenarios'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { prisonerProfileSensitiveEditCheckScenarios } from '../../../sharedChecks/prisonerProfileSensitiveEditCheck/PrisonerProfileSensitiveEditCheckScenarios'
import inUsersCaseLoadAndUserHasSomeRolesFromScenarios from '../../../sharedChecks/inUsersCaseLoadAndUserHasSomeRolesFrom/InUsersCaseLoadAndUserHasSomeRolesFromScenarios'
import { Role } from '../../../../../../types/internal/user/Role'
import inUsersCaseLoadAndUserHasRoleScenarios from '../../../sharedChecks/inUsersCaseLoadAndUserHasRole/InUsersCaseLoadAndUserHasRoleScenarios'
import { contactsReadCheckScenarios } from '../../../sharedChecks/contactsReadCheck/contactsReadCheckScenarios'

describe('Personal Relationships', () => {
  scenarioTests<PersonalRelationshipsPermission>({
    [PersonalRelationshipsPermission.read_number_of_children]: baseCheckScenarios,
    [PersonalRelationshipsPermission.edit_number_of_children]: prisonerProfileEditCheckScenarios,
    [PersonalRelationshipsPermission.read_domestic_status]: baseCheckScenarios,
    [PersonalRelationshipsPermission.edit_domestic_status]: prisonerProfileEditCheckScenarios,
    [PersonalRelationshipsPermission.read_emergency_contacts]: baseCheckScenarios,
    [PersonalRelationshipsPermission.edit_emergency_contacts]: prisonerProfileSensitiveEditCheckScenarios,
    [PersonalRelationshipsPermission.read_contacts]: contactsReadCheckScenarios,
    [PersonalRelationshipsPermission.edit_contacts]: inUsersCaseLoadAndUserHasSomeRolesFromScenarios([
      Role.ContactsAdministrator,
      Role.ContactsAuthoriser,
      Role.PrisonerProfileSensitiveEdit,
    ]),
    [PersonalRelationshipsPermission.edit_contact_restrictions]: inUsersCaseLoadAndUserHasRoleScenarios(
      Role.ContactsAuthoriser,
    ),
    [PersonalRelationshipsPermission.edit_contact_visit_approval]: inUsersCaseLoadAndUserHasRoleScenarios(
      Role.ContactsAuthoriser,
    ),
  })
})
