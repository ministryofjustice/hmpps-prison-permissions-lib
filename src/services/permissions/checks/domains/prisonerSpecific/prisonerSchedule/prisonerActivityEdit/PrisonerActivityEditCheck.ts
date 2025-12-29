import PrisonerPermissionsContext from '../../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { isActiveCaseLoad, userHasRole } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

export default function prisonerActivityEditCheck(permission: PrisonerPermission, context: PrisonerPermissionsContext) {
  return matchBaseCheckAnd(permission, context, {
    overridingCondition: (user, prisoner) => {
      if (!userHasRole(Role.ActivityHub, user)) return PermissionCheckStatus.ROLE_NOT_PRESENT
      if (!isActiveCaseLoad(prisoner.prisonId, user)) return PermissionCheckStatus.NOT_ACTIVE_CASELOAD
      return PermissionCheckStatus.OK
    },
  })
}
