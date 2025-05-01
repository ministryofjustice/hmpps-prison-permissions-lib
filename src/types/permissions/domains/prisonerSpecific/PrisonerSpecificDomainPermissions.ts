import { PrisonerMoneyPermission, PrisonerMoneyPermissions } from './PrisonerMoneyPermissions'

export interface PrisonerSpecificDomainPermissions {
  // Not a full list, for demonstration purposes at the moment:
  prisonerMoney: PrisonerMoneyPermissions
}

export type PrisonerSpecificDomainPermission = PrisonerMoneyPermission
