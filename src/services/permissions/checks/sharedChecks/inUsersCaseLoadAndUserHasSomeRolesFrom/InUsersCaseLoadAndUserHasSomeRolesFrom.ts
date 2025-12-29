import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'
import { Role } from '../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../utils/PermissionCheckUtils'
import { isInUsersCaseLoad, userHasSomeRolesFrom } from '../../../utils/PermissionUtils'

const inUsersCaseLoadAndUserHasSomeRolesFrom =
  (roles: Role[]) => (permission: PrisonerPermission, context: PrisonerPermissionsContext) => {
    return matchBaseCheckAnd(permission, context, {
      overridingCondition: (user, prisoner) => {
        if (!isInUsersCaseLoad(prisoner.prisonId, user)) return PermissionCheckStatus.NOT_IN_CASELOAD
        if (!userHasSomeRolesFrom(roles, user)) return PermissionCheckStatus.ROLE_NOT_PRESENT
        return PermissionCheckStatus.OK
      },
    })
  }

export default inUsersCaseLoadAndUserHasSomeRolesFrom
