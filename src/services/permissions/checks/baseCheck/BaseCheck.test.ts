import { scenarioTests } from '../../../../testUtils/TestScenario'
import { PrisonerBasePermission } from '../../../../types/public/permissions/prisoner/PrisonerPermissions'
import { baseCheckScenarios } from './BaseCheckScenarios'

describe('Base check', () => {
  scenarioTests<PrisonerBasePermission>({ [PrisonerBasePermission.read]: baseCheckScenarios })
})
