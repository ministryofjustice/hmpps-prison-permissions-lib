import PrisonerPermissionsContext from '../../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { isInUsersCaseLoad, userHasSomeRolesFrom } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

export default function prisonerAdjudicationsReadCheck(
  permission: PrisonerPermission,
  context: PrisonerPermissionsContext,
) {
  return matchBaseCheckAnd(permission, context, {
    overridingCondition: (user, prisoner) =>
      isInUsersCaseLoad(prisoner.prisonId, user) || userHasSomeRolesFrom([Role.PomUser, Role.ReceptionUser], user)
        ? PermissionCheckStatus.OK
        : PermissionCheckStatus.NOT_IN_CASELOAD,
  })
}
