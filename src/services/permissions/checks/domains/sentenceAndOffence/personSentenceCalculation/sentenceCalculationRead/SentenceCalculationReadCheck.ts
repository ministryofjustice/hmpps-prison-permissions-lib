import { Role } from '../../../../../../../types/internal/user/Role'
import baseCheckAndUserHasRole from '../../../../sharedChecks/baseCheckAndUserHasRole/BaseCheckAndUserHasRole'

const sentenceCalculationReadCheck = baseCheckAndUserHasRole(Role.ReleaseDatesCalculator)

export default sentenceCalculationReadCheck
