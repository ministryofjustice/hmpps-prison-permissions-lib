import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'
import { Role } from '../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../utils/PermissionCheckUtils'
import { isInUsersCaseLoad, userHasSomeRolesFrom } from '../../../utils/PermissionUtils'

const inUsersCaseLoadAndUserHasSomeRolesFrom = (roles: Role[]) =>
  matchBaseCheckAnd({
    overridingCondition: (user, prisoner) => {
      if (!isInUsersCaseLoad(prisoner.prisonId, user)) return PermissionCheckStatus.NOT_IN_CASELOAD
      if (!userHasSomeRolesFrom(roles, user)) return PermissionCheckStatus.ROLE_NOT_PRESENT
      return PermissionCheckStatus.OK
    },
  })

export default inUsersCaseLoadAndUserHasSomeRolesFrom
