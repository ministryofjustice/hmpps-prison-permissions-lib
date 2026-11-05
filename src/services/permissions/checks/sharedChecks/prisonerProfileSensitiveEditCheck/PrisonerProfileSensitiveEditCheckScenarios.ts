import { Role } from '../../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasRoleScenarios from '../inActiveCaseLoadAndUserHasRole/InActiveCaseLoadAndUserHasRoleScenarios'

export const prisonerProfileSensitiveEditCheckScenarios = inActiveCaseLoadAndUserHasRoleScenarios(
  Role.PrisonerProfileSensitiveEdit,
)
