import { UseOfForcePermission } from '../../../../../../types/public/permissions/domains/prisonerSpecific/useOfForce/UseOfForcePermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { useOfForceEditScenarios } from './useOfForceEdit/UseOfForceEditScenarios'

describe('Use of Force', () => {
  scenarioTests<UseOfForcePermission>({ [UseOfForcePermission.edit]: useOfForceEditScenarios })
})
