import { HmppsUser } from '../../../types/internal/user/HmppsUser'
import Prisoner from '../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PermissionStatus } from '../../../types/internal/permissions/PermissionStatus'
import { PrisonerPermission } from '../../../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsLogger from '../PermissionsLogger'

export default interface PermissionsCheckContext {
  user: HmppsUser
  prisoner: Prisoner
  baseCheckStatus: PermissionStatus
  requestDependentOn: PrisonerPermission[]
  permissionsLogger: PermissionsLogger
}
