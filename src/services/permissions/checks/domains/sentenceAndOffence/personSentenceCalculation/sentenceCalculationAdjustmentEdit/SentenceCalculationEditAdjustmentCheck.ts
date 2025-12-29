import { Role } from '../../../../../../../types/internal/user/Role'
import baseCheckAndUserHasRole from '../../../../sharedChecks/baseCheckAndUserHasRole/BaseCheckAndUserHasRole'

const sentenceCalculationEditAdjustmentCheck = baseCheckAndUserHasRole(Role.AdjustmentsMaintainer)

export default sentenceCalculationEditAdjustmentCheck
