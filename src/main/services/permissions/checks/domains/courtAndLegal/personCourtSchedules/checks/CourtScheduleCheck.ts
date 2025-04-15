import { Operation, Operations } from '../../../../../../../types/permissions/Operations'
import { HmppsUser } from '../../../../../../../types/user/HmppsUser'
import Prisoner from '../../../../../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import {
  PrisonerPermission,
  PrisonerPermissionOperation,
} from '../../../../../../../types/permissions/prisoner/PrisonerPermissions'
import PermissionsLogger from '../../../../../PermissionsLogger'
import { Role } from '../../../../../../../types/user/Role'
import { isRequiredPermission, userHasRoles } from '../../../../../utils/PermissionUtils'
import { PersonCourtSchedulesPermission } from '../../../../../../../types/permissions/domains/courtAndLegal/PersonCourtSchedulesPermissions'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'

export default function courtScheduleCheck(
  user: HmppsUser,
  prisoner: Prisoner,
  baseCheckStatus: PermissionCheckStatus,
  requestDependentOn: PrisonerPermissionOperation[],
  permissionsLogger: PermissionsLogger,
): Operations {
  return {
    read: courtScheduleRead(user, prisoner, baseCheckStatus, requestDependentOn, permissionsLogger),
  }
}

function courtScheduleRead(
  user: HmppsUser,
  prisoner: Prisoner,
  baseCheckStatus: PermissionCheckStatus,
  requestDependentOn: PrisonerPermissionOperation[],
  permissionsLogger: PermissionsLogger,
) {
  const permissionOperation = { permission: PersonCourtSchedulesPermission.schedule, operation: Operation.read }
  const check =
    baseCheckStatus !== PermissionCheckStatus.OK && userHasRoles([Role.ReleaseDatesCalculator], user.userRoles)

  if (!check && isRequiredPermission(permissionOperation, requestDependentOn)) {
    permissionsLogger.logPermissionCheckStatus(
      user,
      prisoner,
      permissionOperation,
      PermissionCheckStatus.NOT_IN_CASELOAD,
    )
  }
  return false
}
