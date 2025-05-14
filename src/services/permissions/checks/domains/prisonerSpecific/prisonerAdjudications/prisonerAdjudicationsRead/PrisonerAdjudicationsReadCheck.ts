import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { isInUsersCaseLoad, logDeniedPermissionCheck, userHasSomeRolesFrom } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PrisonerAdjudicationsPermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsPermissions'

const permission = PrisonerAdjudicationsPermission.read

export default function prisonerAdjudicationsReadCheck(request: PermissionsCheckRequest) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const check =
    baseCheckPassed &&
    (isInUsersCaseLoad(prisoner.prisonId, user) || userHasSomeRolesFrom([Role.PomUser, Role.ReceptionUser], user))

  if (!check) logDeniedPermissionCheck(permission, request, PermissionCheckStatus.NOT_IN_CASELOAD)

  return check
}
