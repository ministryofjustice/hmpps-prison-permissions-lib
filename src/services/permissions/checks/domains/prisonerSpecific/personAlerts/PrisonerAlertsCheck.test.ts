import { PrisonerAlertsPermission } from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerAlerts/PrisonerAlertsPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { prisonerAlertsEditScenarios } from './prisonerAlertsEdit/PrisonerAlertsEditScenarios'

describe('Prisoner Alerts', () => {
  scenarioTests<PrisonerAlertsPermission>({ [PrisonerAlertsPermission.edit]: prisonerAlertsEditScenarios })
})
