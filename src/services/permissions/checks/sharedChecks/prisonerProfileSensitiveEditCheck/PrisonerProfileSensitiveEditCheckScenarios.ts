import { Role } from '../../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasRoleScenarios from '../inActiveCaseLoadAndUserHasRole/InActiveCaseLoadAndUserHasRoleScenarios'

// eslint-disable-next-line import/prefer-default-export
export const prisonerProfileSensitiveEditCheckScenarios = inActiveCaseLoadAndUserHasRoleScenarios(
  Role.PrisonerProfileSensitiveEdit,
)
