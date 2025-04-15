import { HmppsUser } from '../../types/user/HmppsUser'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PrisonerPermissions } from '../../types/permissions/prisoner/PrisonerPermissions'
import PermissionsLogger from '../../services/permissions/PermissionsLogger'

// eslint-disable-next-line import/prefer-default-export
export declare global {
  namespace Express {
    interface Request {
      middleware?: {
        prisonerData?: Prisoner
        permissionsLogger?: PermissionsLogger
      }
    }

    interface Locals {
      user: HmppsUser
      prisonerPermissions?: PrisonerPermissions
    }
  }
}
