import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { isActiveCaseLoad, logDeniedPermissionCheck, userHasRole } from '../../../../../utils/PermissionUtils'
import { PrisonerSchedulePermission } from '../../../../../../../types/permissions/domains/prisonerSpecific/prisonerSchedule/PrisonerSchedulePermissions'
import { Role } from '../../../../../../../types/user/Role'

const permission = PrisonerSchedulePermission.edit_activity

export default function prisonerActivityEditCheck(request: PermissionsCheckRequest) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
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
      userHasActivityHubRole ? PermissionCheckStatus.NOT_ACTIVE_CASELOAD : PermissionCheckStatus.ROLE_NOT_PRESENT,
    )

  return check
}
