import baseCheckAndUserHasRoleScenarios from '../../../../sharedChecks/baseCheckAndUserHasRole/BaseCheckAndUserHasRoleScenarios'
import { Role } from '../../../../../../../types/internal/user/Role'

// eslint-disable-next-line import/prefer-default-export
export const dietEditScenarios = baseCheckAndUserHasRoleScenarios(Role.DietAndAllergiesEdit)
