import { scenarioTest } from '../../testUtils/TestScenario'
import { PersonalRelationshipsPermission } from '../../types/public/permissions/domains/person/personalRelationships/PersonalRelationshipsPermissions'
import { Role } from '../../types/internal/user/Role'
import inUsersCaseLoadAndUserHasSomeRolesFromScenarios from './scenarios/InUsersCaseLoadAndUserHasSomeRolesFromScenarios'
import inUsersCaseLoadAndUserHasRoleScenarios from './scenarios/InUsersCaseLoadAndUserHasRoleScenarios'
import { contactsReadCheckScenarios } from '../../services/permissions/checks/sharedChecks/contactsReadCheck/contactsReadCheckScenarios'

/**
 * Please contact #managing-contacts if any of these tests break
 * due to permissions changes since this will affect the Contacts UI.
 */
describe('Contacts UI Contract Tests', () => {
  scenarioTest(PersonalRelationshipsPermission.read_contacts, contactsReadCheckScenarios)
  scenarioTest(
    PersonalRelationshipsPermission.edit_contacts,
    inUsersCaseLoadAndUserHasSomeRolesFromScenarios([Role.ContactsAdministrator, Role.ContactsAuthoriser]),
  )
  scenarioTest(
    PersonalRelationshipsPermission.edit_contact_restrictions,
    inUsersCaseLoadAndUserHasRoleScenarios(Role.ContactsAuthoriser),
  )
  scenarioTest(
    PersonalRelationshipsPermission.edit_contact_visit_approval,
    inUsersCaseLoadAndUserHasRoleScenarios(Role.ContactsAuthoriser),
  )
})
