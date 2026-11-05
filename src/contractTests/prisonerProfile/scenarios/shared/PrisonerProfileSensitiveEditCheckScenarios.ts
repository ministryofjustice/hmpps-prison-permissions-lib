import { Role } from '../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasRoleScenarios from '../../../../services/permissions/checks/sharedChecks/inActiveCaseLoadAndUserHasRole/InActiveCaseLoadAndUserHasRoleScenarios'

export const prisonerProfileSensitiveEditCheckScenarios = inActiveCaseLoadAndUserHasRoleScenarios(
  Role.PrisonerProfileSensitiveEdit,
)
