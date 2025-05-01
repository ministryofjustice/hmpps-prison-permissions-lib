import { PrisonerMoneyPermission, PrisonerMoneyPermissions } from './prisonerMoney/PrisonerMoneyPermissions'
import {
  PrisonerAdjudicationsPermission,
  PrisonerAdjudicationsPermissions,
} from './prisonerAdjudications/PrisonerAdjudicationsPermissions'

export interface PrisonerSpecificDomainPermissions {
  prisonerMoney: PrisonerMoneyPermissions
  prisonerAdjudications: PrisonerAdjudicationsPermissions
}

export type PrisonerSpecificDomainPermission = PrisonerMoneyPermission | PrisonerAdjudicationsPermission
