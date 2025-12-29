import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'
import { isActiveCaseLoad, userHasSomeRolesFrom } from '../../../utils/PermissionUtils'
import { Role } from '../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../utils/PermissionCheckUtils'

const inActiveCaseLoadAndUserHasSomeRolesFrom = (roles: Role[]) =>
  matchBaseCheckAnd({
    overridingCondition: (user, prisoner) => {
      if (!userHasSomeRolesFrom(roles, user)) return PermissionCheckStatus.ROLE_NOT_PRESENT

      return isActiveCaseLoad(prisoner.prisonId, user)
        ? PermissionCheckStatus.OK
        : PermissionCheckStatus.NOT_ACTIVE_CASELOAD
    },
  })

export default inActiveCaseLoadAndUserHasSomeRolesFrom
