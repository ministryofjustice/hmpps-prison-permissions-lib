import { Role } from '../../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasRole from '../inActiveCaseLoadAndUserHasRole/InActiveCaseLoadAndUserHasRole'

const prisonerProfileSensitiveEditCheck = inActiveCaseLoadAndUserHasRole(Role.PrisonerProfileSensitiveEdit)

export default prisonerProfileSensitiveEditCheck
