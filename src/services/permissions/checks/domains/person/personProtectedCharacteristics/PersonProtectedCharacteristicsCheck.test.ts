import { PersonProtectedCharacteristicsPermission } from '../../../../../../types/public/permissions/domains/person/personProtectedCharacteristics/PersonProtectedCharacteristicsPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { baseCheckScenarios } from '../../../baseCheck/BaseCheckScenarios'
import { prisonerProfileSensitiveEditCheckScenarios } from '../../../sharedChecks/prisonerProfileSensitiveEditCheck/PrisonerProfileSensitiveEditCheckScenarios'
import { inUsersCaseLoadScenarios } from '../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoadScenarios'
import { prisonerProfileEditCheckScenarios } from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheckScenarios'

describe('Person Protected Characteristics', () => {
  scenarioTests<PersonProtectedCharacteristicsPermission>({
    [PersonProtectedCharacteristicsPermission.read_sexual_orientation]: baseCheckScenarios,
    [PersonProtectedCharacteristicsPermission.edit_sexual_orientation]: prisonerProfileSensitiveEditCheckScenarios,
    [PersonProtectedCharacteristicsPermission.read_religion_and_belief]: inUsersCaseLoadScenarios,
    [PersonProtectedCharacteristicsPermission.edit_religion_and_belief]: prisonerProfileEditCheckScenarios,
    [PersonProtectedCharacteristicsPermission.read_ethnicity]: baseCheckScenarios,
    [PersonProtectedCharacteristicsPermission.edit_ethnicity]: prisonerProfileSensitiveEditCheckScenarios,
  })
})
