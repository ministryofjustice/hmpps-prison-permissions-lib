import baseCheckAndUserHasRoleScenarios from '../baseCheckAndUserHasRole/BaseCheckAndUserHasRoleScenarios'
import { Role } from '../../../../../types/internal/user/Role'

// eslint-disable-next-line import/prefer-default-export
export const prisonerProfileSensitiveEditCheckScenarios = baseCheckAndUserHasRoleScenarios(
  Role.PrisonerProfileSensitiveEdit,
)
