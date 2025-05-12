import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { isActiveCaseLoad, logDeniedPermissionCheck } from '../../../../../utils/PermissionUtils'
import { PrisonerSchedulePermission } from '../../../../../../../types/permissions/domains/prisonerSpecific/prisonerSchedule/PrisonerSchedulePermissions'

const permission = PrisonerSchedulePermission.edit

export default function prisonerScheduleEditCheck(request: PermissionsCheckRequest) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const check = baseCheckPassed && isActiveCaseLoad(prisoner.prisonId, user) && !prisoner.restrictedPatient

  if (!check) logDeniedPermissionCheck(permission, request, PermissionCheckStatus.NOT_ACTIVE_CASELOAD)

  return check
}
