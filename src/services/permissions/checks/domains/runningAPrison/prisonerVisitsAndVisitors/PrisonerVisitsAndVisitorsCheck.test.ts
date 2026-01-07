import { PrisonerVisitsAndVisitorsPermission } from '../../../../../../types/public/permissions/domains/runningAPrison/prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { prisonerVisitsAndVisitorsReadScenarios } from './prisonerVisitsAndVisitorsRead/PrisonerVisitsAndVisitorsReadScenarios'

describe('Prisoner Visits and Visitors', () => {
  scenarioTests<PrisonerVisitsAndVisitorsPermission>({
    [PrisonerVisitsAndVisitorsPermission.read]: prisonerVisitsAndVisitorsReadScenarios,
  })
})
