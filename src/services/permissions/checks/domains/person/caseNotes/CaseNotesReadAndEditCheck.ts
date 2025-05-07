import { CaseNotesPermission } from '../../../../../../types/permissions/domains/person/caseNotes/CaseNotesPermissions'
import { PermissionCheckStatus } from '../../../../../../types/permissions/PermissionCheckStatus'
import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import { isInUsersCaseLoad, logDeniedPermissionCheck, userHasAllRoles } from '../../../../utils/PermissionUtils'
import restrictedPatientStatus from '../../../baseCheck/status/RestrictedPatientStatus'
import releasedPrisonerStatus from '../../../baseCheck/status/ReleasedPrisonerStatus'
import transferringPrisonerStatus from '../../../baseCheck/status/TransferringPrisonerStatus'
import { Role } from '../../../../../../types/user/Role'

export default function caseNotesReadAndEditCheck(permission: CaseNotesPermission, request: PermissionsCheckRequest) {
  const baseCheckPassed = request.baseCheckStatus === PermissionCheckStatus.OK

  const check = baseCheckPassed && accessOutsideOfCaseLoadDueToGlobalSearchAlsoRequiresPomRole(request)

  if (!check) logDeniedPermissionCheck(permission, request, PermissionCheckStatus.ROLE_NOT_PRESENT)

  return check
}

function accessOutsideOfCaseLoadDueToGlobalSearchAlsoRequiresPomRole(request: PermissionsCheckRequest): boolean {
  const { user, prisoner } = request
  const inUsersCaseLoad = isInUsersCaseLoad(prisoner.prisonId, user)

  if (prisoner.restrictedPatient) return restrictedPatientStatus(user, prisoner) === PermissionCheckStatus.OK
  if (prisoner.prisonId === 'OUT') return releasedPrisonerStatus(user) === PermissionCheckStatus.OK
  if (prisoner.prisonId === 'TRN') return transferringPrisonerStatus(user) === PermissionCheckStatus.OK
  if (inUsersCaseLoad) return true

  return userHasAllRoles([Role.GlobalSearch, Role.PomUser], user.userRoles)
}
