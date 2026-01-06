import { SOCPermission } from '../../../../../../types/public/permissions/domains/security/soc/SOCPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { socReadScenarios } from './socRead/SOCReadScenarios'
import { socEditScenarios } from './socEdit/SocEditScenarios'

describe('SOC', () => {
  scenarioTests<SOCPermission>({
    [SOCPermission.read]: socReadScenarios,
    [SOCPermission.edit]: socEditScenarios,
  })
})
