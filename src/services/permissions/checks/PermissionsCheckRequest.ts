import { HmppsUser } from '../../../types/user/HmppsUser'
import Prisoner from '../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PermissionCheckStatus } from '../../../types/permissions/PermissionCheckStatus'
import { PrisonerPermission } from '../../../types/permissions/prisoner/PrisonerPermissions'
import PermissionsLogger from '../PermissionsLogger'

export default interface PermissionsCheckRequest {
  user: HmppsUser
  prisoner: Prisoner
  baseCheckStatus: PermissionCheckStatus
  requestDependentOn: PrisonerPermission[]
  permissionsLogger: PermissionsLogger
}
