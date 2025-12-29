import { Role } from '../../../../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasRole from '../../../../sharedChecks/inActiveCaseLoadAndUserHasRole/InActiveCaseLoadAndUserHasRole'

const dietEditCheck = inActiveCaseLoadAndUserHasRole(Role.DietAndAllergiesEdit)

export default dietEditCheck
