import { ProbationDocumentsPermission } from '../../../../../../types/public/permissions/domains/probation/probationDocuments/ProbationDocumentsPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { probationDocumentsReadScenarios } from './probationDocumentsRead/ProbationDocumentsReadScenarios'

describe('Probation Documents', () => {
  scenarioTests<ProbationDocumentsPermission>({ [ProbationDocumentsPermission.read]: probationDocumentsReadScenarios })
})
