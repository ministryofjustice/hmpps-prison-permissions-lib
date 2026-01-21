import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { PrisonerMovesPermission } from '../../../../../../types/public/permissions/domains/runningAPrison/prisonerMoves/PrisonerMovesPermissions'
import baseCheckAndUserHasRoleScenarios from '../../../sharedChecks/baseCheckAndUserHasRole/BaseCheckAndUserHasRoleScenarios'
import { Role } from '../../../../../../types/internal/user/Role'

describe('Prisoner Moves', () => {
  scenarioTests<PrisonerMovesPermission>({
    [PrisonerMovesPermission.read_temporary_absence]: baseCheckAndUserHasRoleScenarios(
      Role.ExternalMovementsTemporaryAbsenceViewOnly,
    ),
    [PrisonerMovesPermission.edit_temporary_absence]: baseCheckAndUserHasRoleScenarios(
      Role.ExternalMovementsTemporaryAbsenceManagement,
    ),
  })
})
