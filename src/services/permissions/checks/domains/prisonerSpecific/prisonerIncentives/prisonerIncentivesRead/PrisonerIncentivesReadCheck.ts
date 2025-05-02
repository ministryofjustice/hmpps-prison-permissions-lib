import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { isInUsersCaseLoad, logDeniedPermissionCheck, userHasRole } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/user/Role'
import { PrisonerIncentivesPermission } from '../../../../../../../types/permissions/domains/prisonerSpecific/prisonerIncentives/PrisonerIncentivesPermissions'

const permission = PrisonerIncentivesPermission.read

export default function prisonerIncentivesReadCheck(request: PermissionsCheckRequest) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const check =
    baseCheckPassed && (isInUsersCaseLoad(prisoner.prisonId, user) || userHasRole(Role.GlobalSearch, user.userRoles))

  if (!check) logDeniedPermissionCheck(permission, request, PermissionCheckStatus.NOT_IN_CASELOAD)

  return check
}
