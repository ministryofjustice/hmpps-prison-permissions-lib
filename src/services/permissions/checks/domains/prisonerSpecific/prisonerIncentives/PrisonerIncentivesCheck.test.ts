import { PrisonerIncentivesPermission } from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerIncentives/PrisonerIncentivesPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { baseCheckScenarios } from '../../../baseCheck/BaseCheckScenarios'
import { incentiveLevelHistoryReadScenarios } from './incentiveLevelHistoryRead/IncentiveLevelHistoryReadScenarios'

describe('Prisoner Incentives', () => {
  scenarioTests<PrisonerIncentivesPermission>({
    [PrisonerIncentivesPermission.read_incentive_level]: baseCheckScenarios,
    [PrisonerIncentivesPermission.read_incentive_level_history]: incentiveLevelHistoryReadScenarios,
  })
})
