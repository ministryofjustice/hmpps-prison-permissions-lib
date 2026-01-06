import { PrisonerSpecificRisksPermission } from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerSpecificRisks/PrisonerSpecificRisksPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { baseCheckScenarios } from '../../../baseCheck/BaseCheckScenarios'
import { csraAssessmentHistoryReadScenarios } from './csraRead/CsraAssessmentHistoryReadScenarios'

describe('Prisoner Specific Risks', () => {
  scenarioTests<PrisonerSpecificRisksPermission>({
    [PrisonerSpecificRisksPermission.read_csra_rating]: baseCheckScenarios,
    [PrisonerSpecificRisksPermission.read_csra_assessment_history]: csraAssessmentHistoryReadScenarios,
  })
})
