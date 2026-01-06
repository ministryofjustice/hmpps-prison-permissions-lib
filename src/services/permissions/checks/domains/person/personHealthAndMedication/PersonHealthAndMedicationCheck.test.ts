import { PersonHealthAndMedicationPermission } from '../../../../../../types/public/permissions/domains/person/personHealthAndMedication/PersonHealthAndMedicationPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { baseCheckScenarios } from '../../../baseCheck/BaseCheckScenarios'
import { prisonerProfileEditCheckScenarios } from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheckScenarios'
import { dietEditScenarios } from './dietEdit/DietEditScenarios'

describe('Person Health And Medication', () => {
  scenarioTests<PersonHealthAndMedicationPermission>({
    [PersonHealthAndMedicationPermission.read_pregnancy]: baseCheckScenarios,
    [PersonHealthAndMedicationPermission.edit_pregnancy]: prisonerProfileEditCheckScenarios,
    [PersonHealthAndMedicationPermission.read_smoker]: baseCheckScenarios,
    [PersonHealthAndMedicationPermission.edit_smoker]: prisonerProfileEditCheckScenarios,
    [PersonHealthAndMedicationPermission.read_diet]: baseCheckScenarios,
    [PersonHealthAndMedicationPermission.edit_diet]: dietEditScenarios,
  })
})
