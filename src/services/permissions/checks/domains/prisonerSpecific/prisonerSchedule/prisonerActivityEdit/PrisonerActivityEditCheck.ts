import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'
import { isActiveCaseLoad, logDeniedPermissionCheck, userHasRole } from '../../../../../utils/PermissionUtils'
import { PrisonerSchedulePermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerSchedule/PrisonerSchedulePermissions'
import { Role } from '../../../../../../../types/internal/user/Role'

const permission = PrisonerSchedulePermission.edit_activity

export default function prisonerActivityEditCheck(request: PermissionsCheckContext) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionStatus.OK
  const userHasActivityHubRole = userHasRole(Role.ActivityHub, user)

  const check =
    baseCheckPassed &&
    userHasActivityHubRole &&
    isActiveCaseLoad(prisoner.prisonId, user) &&
    !prisoner.restrictedPatient

  if (!check)
    logDeniedPermissionCheck(
      permission,
      request,
      userHasActivityHubRole ? PermissionStatus.NOT_ACTIVE_CASELOAD : PermissionStatus.ROLE_NOT_PRESENT,
    )

  return check
}
