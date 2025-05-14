import { HmppsUser } from '../../../types/internal/user/HmppsUser'
import Prisoner from '../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PermissionCheckStatus } from '../../../types/internal/permissions/PermissionCheckStatus'
import { PrisonerPermission } from '../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsLogger from '../PermissionsLogger'

export default interface PermissionsCheckRequest {
  user: HmppsUser
  prisoner: Prisoner
  baseCheckStatus: PermissionCheckStatus
  requestDependentOn: PrisonerPermission[]
  permissionsLogger: PermissionsLogger
}
