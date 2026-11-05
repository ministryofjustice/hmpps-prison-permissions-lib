import { Role } from '../../../../../../../types/internal/user/Role'
import baseCheckAndUserHasRoleScenarios from '../../../../sharedChecks/baseCheckAndUserHasRole/BaseCheckAndUserHasRoleScenarios'

export const sentenceCalculationEditAdjustmentScenarios = baseCheckAndUserHasRoleScenarios(Role.AdjustmentsMaintainer)
