import { Role } from '../../../../../../../types/internal/user/Role'
import baseCheckAndUserHasRoleScenarios from '../../../../sharedChecks/baseCheckAndUserHasRole/BaseCheckAndUserHasRoleScenarios'

// eslint-disable-next-line import/prefer-default-export
export const sentenceCalculationReadScenarios = baseCheckAndUserHasRoleScenarios(Role.ReleaseDatesCalculator)
