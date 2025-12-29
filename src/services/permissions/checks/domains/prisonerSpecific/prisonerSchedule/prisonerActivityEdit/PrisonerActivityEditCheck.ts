import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { isActiveCaseLoad, userHasRole } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

const prisonerActivityEditCheck = matchBaseCheckAnd({
  overridingCondition: (user, prisoner) => {
    if (!userHasRole(Role.ActivityHub, user)) return PermissionCheckStatus.ROLE_NOT_PRESENT
    if (!isActiveCaseLoad(prisoner.prisonId, user)) return PermissionCheckStatus.NOT_ACTIVE_CASELOAD
    return PermissionCheckStatus.OK
  },
})

export default prisonerActivityEditCheck
