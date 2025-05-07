import { PrisonerMoneyPermission, PrisonerMoneyPermissions } from './prisonerMoney/PrisonerMoneyPermissions'
import {
  PrisonerAdjudicationsPermission,
  PrisonerAdjudicationsPermissions,
} from './prisonerAdjudications/PrisonerAdjudicationsPermissions'
import {
  PrisonerIncentivesPermission,
  PrisonerIncentivesPermissions,
} from './prisonerIncentives/PrisonerIncentivesPermissions'

export interface PrisonerSpecificDomainPermissions {
  prisonerMoney: PrisonerMoneyPermissions
  prisonerAdjudications: PrisonerAdjudicationsPermissions
  prisonerIncentives: PrisonerIncentivesPermissions
}

export type PrisonerSpecificDomainPermission =
  | PrisonerMoneyPermission
  | PrisonerAdjudicationsPermission
  | PrisonerIncentivesPermission
