import { PathfinderPermission } from '../../../../../../types/public/permissions/domains/security/pathfinder/PathfinderPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { pathfinderReadScenarios } from './pathfinderRead/PathfinderReadScenarios'
import { pathfinderEditScenarios } from './pathfinderEdit/PathfinderEditScenarios'

describe('Pathfinder', () => {
  scenarioTests<PathfinderPermission>({
    [PathfinderPermission.read]: pathfinderReadScenarios,
    [PathfinderPermission.edit]: pathfinderEditScenarios,
  })
})
