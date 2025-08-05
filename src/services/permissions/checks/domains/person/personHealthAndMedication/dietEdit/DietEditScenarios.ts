import { Role } from '../../../../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasRoleScenarios from '../../../../sharedChecks/inActiveCaseLoadAndUserHasRole/InActiveCaseLoadAndUserHasRoleScenarios'

// eslint-disable-next-line import/prefer-default-export
export const dietEditScenarios = inActiveCaseLoadAndUserHasRoleScenarios(Role.DietAndAllergiesEdit)
