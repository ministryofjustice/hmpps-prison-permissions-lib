import { scenarioTest } from '../../testUtils/TestScenario'
import { PersonalRelationshipsPermission } from '../../types/public/permissions/domains/person/personalRelationships/PersonalRelationshipsPermissions'
import { inUsersCaseLoadScenarios } from '../../services/permissions/checks/sharedChecks/inUsersCaseLoad/InUsersCaseLoadScenarios'
import { Role } from '../../types/internal/user/Role'
import inUsersCaseLoadAndUserHasSomeRolesFromScenarios from './scenarios/InUsersCaseLoadAndUserHasSomeRolesFromScenarios'
import inUsersCaseLoadAndUserHasRoleScenarios from './scenarios/InUsersCaseLoadAndUserHasRoleScenarios'

/**
 * Please contact #managing-contacts if any of these tests break
 * due to permissions changes since this will affect the Contacts UI.
 */
describe('Contacts UI Contract Tests', () => {
  scenarioTest(PersonalRelationshipsPermission.read_contacts, inUsersCaseLoadScenarios)
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
