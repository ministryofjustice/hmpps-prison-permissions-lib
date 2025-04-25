import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { PersonCourtSchedulesPermission } from '../../../../../../../types/permissions/domains/courtAndLegal/PersonCourtSchedulesPermissions'
import { isRequiredPermission, userHasRoles } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/user/Role'
import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'

const permission = PersonCourtSchedulesPermission.read_schedule

export default function courtScheduleReadCheck(request: PermissionsCheckRequest) {
  const { user, prisoner, baseCheckStatus, requestDependentOn, permissionsLogger } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const check = baseCheckPassed && userHasRoles([Role.ReleaseDatesCalculator], user.userRoles)

  if (!check && isRequiredPermission(permission, requestDependentOn)) {
    const status = baseCheckPassed ? PermissionCheckStatus.ROLE_NOT_PRESENT : baseCheckStatus
    permissionsLogger.logPermissionCheckStatus(user, prisoner, permission, status)
  }

  return check
}
