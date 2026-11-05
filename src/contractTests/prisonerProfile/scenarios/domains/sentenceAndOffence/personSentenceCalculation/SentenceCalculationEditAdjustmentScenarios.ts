import { Role } from '../../../../../../types/internal/user/Role'
import baseCheckAndUserHasRoleScenarios from '../../../shared/BaseCheckAndUserHasRoleScenarios'

export const sentenceCalculationEditAdjustmentScenarios = baseCheckAndUserHasRoleScenarios(Role.AdjustmentsMaintainer)
