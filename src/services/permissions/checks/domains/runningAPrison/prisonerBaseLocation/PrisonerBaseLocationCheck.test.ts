import { PrisonerBaseLocationPermission } from '../../../../../../types/public/permissions/domains/runningAPrison/prisonerBaseLocation/PrisonerBaseLocationPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { locationDetailsAndHistoryReadScenarios } from './locationDetailsAndHistoryRead/LocationDetailsAndHistoryReadScenarios'
import { moveCellScenarios } from './moveCell/MoveCellScenarios'

describe('Prisoner Base Location', () => {
  scenarioTests<PrisonerBaseLocationPermission>({
    [PrisonerBaseLocationPermission.read_location_details]: locationDetailsAndHistoryReadScenarios,
    [PrisonerBaseLocationPermission.read_location_history]: locationDetailsAndHistoryReadScenarios,
    [PrisonerBaseLocationPermission.move_cell]: moveCellScenarios,
  })
})
