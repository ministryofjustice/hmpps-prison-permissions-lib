import { HmppsUser } from '../../types/user/HmppsUser'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PrisonerPermissions } from '../../types/permissions/prisoner/PrisonerPermissions'

export declare module 'express-session' {
  // Declare that the session will potentially contain these additional fields
  interface SessionData {
    keyWorkerAtPrisons?: Record<string, boolean>
  }
}

export declare global {
  namespace Express {
    interface Request {
      middleware?: {
        prisonerData?: Prisoner
      }
    }

    interface Locals {
      user: HmppsUser
      prisonerPermissions?: PrisonerPermissions
    }
  }
}
