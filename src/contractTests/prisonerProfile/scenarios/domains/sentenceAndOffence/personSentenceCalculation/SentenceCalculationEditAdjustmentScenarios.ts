import { Role } from '../../../../../../types/internal/user/Role'
import baseCheckAndUserHasRoleScenarios from '../../../shared/BaseCheckAndUserHasRoleScenarios'

// eslint-disable-next-line import/prefer-default-export
export const sentenceCalculationEditAdjustmentScenarios = baseCheckAndUserHasRoleScenarios(Role.AdjustmentsMaintainer)
