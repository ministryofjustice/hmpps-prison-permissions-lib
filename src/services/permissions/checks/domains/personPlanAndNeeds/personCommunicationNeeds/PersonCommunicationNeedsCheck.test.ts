import { PersonCommunicationNeedsPermission } from '../../../../../../types/public/permissions/domains/personPlanAndNeeds/personCommunicationNeeds/PersonCommunicationNeedsPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { baseCheckScenarios } from '../../../baseCheck/BaseCheckScenarios'
import { prisonerProfileEditCheckScenarios } from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheckScenarios'

describe('Person Communication Needs', () => {
  scenarioTests<PersonCommunicationNeedsPermission>({
    [PersonCommunicationNeedsPermission.read_language]: baseCheckScenarios,
    [PersonCommunicationNeedsPermission.edit_language]: prisonerProfileEditCheckScenarios,
  })
})
