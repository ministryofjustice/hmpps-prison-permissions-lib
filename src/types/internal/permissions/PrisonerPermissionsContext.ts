import { HmppsUser } from '../user/HmppsUser'
import Prisoner from '../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PermissionCheckStatus } from './PermissionCheckStatus'
import { PrisonerPermission } from '../../public/permissions/prisoner/PrisonerPermissions'
import PermissionsLogger from '../../../services/permissions/PermissionsLogger'

export default interface PrisonerPermissionsContext {
  user: HmppsUser
  prisoner: Prisoner
  baseCheckStatus: PermissionCheckStatus
  requestDependentOn: PrisonerPermission[]
  permissionsLogger: PermissionsLogger
  readOnly: boolean
}
