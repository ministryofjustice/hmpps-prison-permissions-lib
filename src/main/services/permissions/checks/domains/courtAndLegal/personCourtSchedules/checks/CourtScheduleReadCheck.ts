import { HmppsUser } from '../../../../../../../types/user/HmppsUser'
import Prisoner from '../../../../../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import PermissionsLogger from '../../../../../PermissionsLogger'
import { Role } from '../../../../../../../types/user/Role'
import { isRequiredPermission, userHasRoles } from '../../../../../utils/PermissionUtils'
import { PersonCourtSchedulesPermission } from '../../../../../../../types/permissions/domains/courtAndLegal/PersonCourtSchedulesPermissions'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { PrisonerPermission } from '../../../../../../../types/permissions/prisoner/PrisonerPermissions'

export default function courtScheduleReadCheck(
  user: HmppsUser,
  prisoner: Prisoner,
  baseCheckStatus: PermissionCheckStatus,
  requestDependentOn: PrisonerPermission[],
  permissionsLogger: PermissionsLogger,
) {
  const permission = PersonCourtSchedulesPermission.read_schedule
  const check =
    baseCheckStatus !== PermissionCheckStatus.OK && userHasRoles([Role.ReleaseDatesCalculator], user.userRoles)

  if (!check && isRequiredPermission(permission, requestDependentOn)) {
    permissionsLogger.logPermissionCheckStatus(user, prisoner, permission, PermissionCheckStatus.NOT_IN_CASELOAD)
  }
  return false
}
