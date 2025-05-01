import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PrisonerMoneyPermission } from '../../../../../../../types/permissions/domains/prisonerSpecific/PrisonerMoneyPermissions'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { isInUsersCaseLoad, logDeniedPermissionCheck } from '../../../../../utils/PermissionUtils'

const permission = PrisonerMoneyPermission.read

export default function prisonerMoneyReadCheck(request: PermissionsCheckRequest) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const check = baseCheckPassed && isInUsersCaseLoad(prisoner.prisonId, user)

  if (!check) logDeniedPermissionCheck(permission, request, PermissionCheckStatus.NOT_IN_CASELOAD)

  return check
}
