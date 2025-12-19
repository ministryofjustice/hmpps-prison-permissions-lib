import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'
import { userHasRole } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { CorePersonRecordPermission } from '../../../../../../../types/public/permissions/domains/person/corePersonRecord/CorePersonRecordPermissions'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

const permission = CorePersonRecordPermission.read_photo

export default function photoReadCheck(request: PermissionsCheckContext) {
  return matchBaseCheckAnd(request, permission, {
    ifTransferringPrisoner: (user, _) =>
      userHasRole(Role.InactiveBookings, user) ? PermissionStatus.OK : PermissionStatus.PRISONER_IS_TRANSFERRING,
    ifInPrisonOutsideCaseload: (_, __) => PermissionStatus.NOT_IN_CASELOAD,
  })
}
