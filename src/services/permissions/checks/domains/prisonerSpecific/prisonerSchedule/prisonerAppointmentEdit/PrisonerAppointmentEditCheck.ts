import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'
import { isActiveCaseLoad, logDeniedPermissionCheck } from '../../../../../utils/PermissionUtils'
import { PrisonerSchedulePermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerSchedule/PrisonerSchedulePermissions'

const permission = PrisonerSchedulePermission.edit_appointment

export default function prisonerAppointmentEditCheck(request: PermissionsCheckContext) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionStatus.OK
  const check = baseCheckPassed && isActiveCaseLoad(prisoner.prisonId, user) && !prisoner.restrictedPatient

  if (!check) logDeniedPermissionCheck(permission, request, PermissionStatus.NOT_ACTIVE_CASELOAD)

  return check
}
