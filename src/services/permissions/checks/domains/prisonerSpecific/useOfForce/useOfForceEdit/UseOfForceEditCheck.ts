import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import {
  isInUsersCaseLoad,
  isReleasedOrTransferring,
  logDeniedPermissionCheck,
  userHasRole,
} from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/user/Role'
import { UseOfForcePermission } from '../../../../../../../types/permissions/domains/prisonerSpecific/useOfForce/UseOfForcePermissions'

const permission = UseOfForcePermission.edit

export default function useOfForceEditCheck(request: PermissionsCheckRequest) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const check =
    baseCheckPassed &&
    !prisoner.restrictedPatient &&
    (isInUsersCaseLoad(prisoner.prisonId, user) ||
      (isReleasedOrTransferring(prisoner.prisonId) && userHasRole(Role.InactiveBookings, user)))

  if (!check) logDeniedPermissionCheck(permission, request, PermissionCheckStatus.NOT_ACTIVE_CASELOAD)

  return check
}
