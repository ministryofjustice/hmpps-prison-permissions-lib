import { HmppsUser } from '../user/HmppsUser'
import Prisoner from '../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PrisonerPermission } from '../../public/permissions/prisoner/PrisonerPermissions'
import { PermissionStatus } from './PermissionStatus'

export interface PermissionContext {
  user: HmppsUser
  prisoner: Prisoner
  permission: PrisonerPermission
  permissionRequired: boolean
}

export type PermissionStatusFunction = (context: PermissionContext) => PermissionStatus
