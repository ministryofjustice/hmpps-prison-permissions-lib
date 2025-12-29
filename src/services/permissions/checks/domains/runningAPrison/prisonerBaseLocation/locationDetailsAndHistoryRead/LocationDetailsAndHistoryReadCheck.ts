import PrisonerPermissionsContext from '../../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

export default function locationDetailsAndHistoryReadCheck(
  permission: PrisonerPermission,
  context: PrisonerPermissionsContext,
) {
  return matchBaseCheckAnd(permission, context, {
    // Global search access is not allowed:
    ifPrisonNotInCaseload: () => PermissionCheckStatus.NOT_IN_CASELOAD,
  })
}
