import { HmppsUser } from '../../types/internal/user/HmppsUser'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PrisonerPermissions } from '../../types/public/permissions/prisoner/PrisonerPermissions'

// eslint-disable-next-line import/prefer-default-export
export declare global {
  namespace Express {
    interface Request {
      middleware?: {
        prisonerData?: Prisoner
        duplicatePrisonerData?: Prisoner[]
      }
    }

    interface Locals {
      user: HmppsUser
      prisonerPermissions?: PrisonerPermissions
    }
  }
}
