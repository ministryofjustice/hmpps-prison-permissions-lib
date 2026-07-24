import { Role } from '../../../../../../../types/internal/user/Role'
import baseCheckAndUserHasRole from '../../../../sharedChecks/baseCheckAndUserHasRole/BaseCheckAndUserHasRole'

const sentenceCalculationEditCheck = baseCheckAndUserHasRole(Role.ReleaseDatesCalculator)

export default sentenceCalculationEditCheck
