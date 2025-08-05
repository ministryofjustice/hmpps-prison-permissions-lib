import { Role } from '../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasRoleScenarios from '../../../../services/permissions/checks/sharedChecks/inActiveCaseLoadAndUserHasRole/InActiveCaseLoadAndUserHasRoleScenarios'

// eslint-disable-next-line import/prefer-default-export
export const prisonerProfileSensitiveEditCheckScenarios = inActiveCaseLoadAndUserHasRoleScenarios(
  Role.PrisonerProfileSensitiveEdit,
)
