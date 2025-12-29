import PrisonerPermissionsContext from '../../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { userHasRole } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'

export default function photoReadCheck(permission: PrisonerPermission, context: PrisonerPermissionsContext) {
  return matchBaseCheckAnd(permission, context, {
    // Photos are only accessible for transferring prisoners if the user has the Inactive Bookings role
    // (Global Search is NOT sufficient):
    ifTransferringPrisoner: user =>
      userHasRole(Role.InactiveBookings, user)
        ? PermissionCheckStatus.OK
        : PermissionCheckStatus.PRISONER_IS_TRANSFERRING,

    // Global search does NOT permit access to photo:
    ifPrisonNotInCaseload: () => PermissionCheckStatus.NOT_IN_CASELOAD,
  })
}
