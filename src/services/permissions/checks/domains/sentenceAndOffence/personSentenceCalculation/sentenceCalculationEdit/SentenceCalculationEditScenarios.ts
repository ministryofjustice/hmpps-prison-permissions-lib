import { Role } from '../../../../../../../types/internal/user/Role'
import baseCheckAndUserHasRoleScenarios from '../../../../sharedChecks/baseCheckAndUserHasRole/BaseCheckAndUserHasRoleScenarios'

export const sentenceCalculationEditScenarios = baseCheckAndUserHasRoleScenarios(Role.ReleaseDatesCalculator)
