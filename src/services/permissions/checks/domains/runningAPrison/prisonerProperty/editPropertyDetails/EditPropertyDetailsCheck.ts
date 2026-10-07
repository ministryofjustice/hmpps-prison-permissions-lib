import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'
import { readPropertyDetailsConditions } from '../readPropertyDetails/ReadPropertyDetailsCheck'
import { Role } from '../../../../../../../types/internal/user/Role'

const editPropertyDetailsCheck = matchBaseCheckAnd({
  // These rules inherit from the 'read property details check', with the additional role requirement
  ...readPropertyDetailsConditions,

  atLeastOneRoleRequiredFrom: [Role.PrisonerPropertyManage],
})

export default editPropertyDetailsCheck
