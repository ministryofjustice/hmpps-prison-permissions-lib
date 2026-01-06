import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { CaseNotesPermission } from '../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { caseNotesReadAndEditScenarios } from './CaseNotesReadAndEditScenarios'
import { sensitiveCaseNotesReadScenarios } from './sensitiveCaseNotesRead/SensitiveCaseNotesReadScenarios'
import { sensitiveCaseNotesDeleteScenarios } from './sensitiveCaseNotesDelete/SensitiveCaseNotesDeleteScenarios'
import { sensitiveCaseNotesEditScenarios } from './sensitiveCaseNotesEdit/SensitiveCaseNotesEditScenarios'

describe('Case Notes', () => {
  scenarioTests<CaseNotesPermission>({
    [CaseNotesPermission.read]: caseNotesReadAndEditScenarios,
    [CaseNotesPermission.edit]: caseNotesReadAndEditScenarios,
    [CaseNotesPermission.read_sensitive]: sensitiveCaseNotesReadScenarios,
    [CaseNotesPermission.delete_sensitive]: sensitiveCaseNotesDeleteScenarios,
    [CaseNotesPermission.edit_sensitive]: sensitiveCaseNotesEditScenarios,
  })
})
