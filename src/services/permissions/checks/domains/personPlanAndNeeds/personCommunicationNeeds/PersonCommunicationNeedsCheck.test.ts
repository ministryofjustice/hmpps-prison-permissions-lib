import { PersonCommunicationNeedsPermission } from '../../../../../../types/public/permissions/domains/personPlanAndNeeds/personCommunicationNeeds/PersonCommunicationNeedsPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { prisonerProfileEditCheckScenarios } from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheckScenarios'
import { inUsersCaseLoadScenarios } from '../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoadScenarios'

describe('Person Communication Needs', () => {
  scenarioTests<PersonCommunicationNeedsPermission>({
    [PersonCommunicationNeedsPermission.read_language]: inUsersCaseLoadScenarios,
    [PersonCommunicationNeedsPermission.edit_language]: prisonerProfileEditCheckScenarios,
  })
})
