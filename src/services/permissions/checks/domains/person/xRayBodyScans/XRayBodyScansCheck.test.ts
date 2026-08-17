import { XRayBodyScansPermission } from '../../../../../../types/public/permissions/domains/person/xRayBodyScans/XRayBodyScansPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { xrbsReadScenarios } from './xrbsRead/XRBSReadScenarios'
import { xrbsEditScenarios } from './xrbsEdit/XRBSEditScenarios'

describe('XRayBodyScans', () => {
  scenarioTests<XRayBodyScansPermission>({
    [XRayBodyScansPermission.read_scans]: xrbsReadScenarios,
    [XRayBodyScansPermission.edit_scans]: xrbsEditScenarios,
  })
})
