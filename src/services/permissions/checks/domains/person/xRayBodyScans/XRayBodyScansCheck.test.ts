import { XRayBodyScansPermission } from '../../../../../../types/public/permissions/domains/person/xRayBodyScans/XRayBodyScansPermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { xrbsReadAndEditScenarios } from './XRBSReadAndEditScenarios'

describe('XRayBodyScans', () => {
  scenarioTests<XRayBodyScansPermission>({
    [XRayBodyScansPermission.read_scans]: xrbsReadAndEditScenarios,
    [XRayBodyScansPermission.edit_scans]: xrbsReadAndEditScenarios,
  })
})
