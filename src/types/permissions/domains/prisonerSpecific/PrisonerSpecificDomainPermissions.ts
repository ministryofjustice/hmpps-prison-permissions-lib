import { PrisonerMoneyPermission, PrisonerMoneyPermissions } from './prisonerMoney/PrisonerMoneyPermissions'
import {
  PrisonerAdjudicationsPermission,
  PrisonerAdjudicationsPermissions,
} from './prisonerAdjudications/PrisonerAdjudicationsPermissions'
import {
  PrisonerIncentivesPermission,
  PrisonerIncentivesPermissions,
} from './prisonerIncentives/PrisonerIncentivesPermissions'
import {
  PersonPrisonCategoryPermission,
  PersonPrisonCategoryPermissions,
} from './personPrisonCategory/PersonPrisonCategoryPermissions'
import { PrisonerSchedulePermission, PrisonerSchedulePermissions } from './prisonerSchedule/PrisonerSchedulePermissions'

export interface PrisonerSpecificDomainPermissions {
  prisonerMoney: PrisonerMoneyPermissions
  prisonerAdjudications: PrisonerAdjudicationsPermissions
  prisonerIncentives: PrisonerIncentivesPermissions
  personPrisonCategory: PersonPrisonCategoryPermissions
  prisonerSchedule: PrisonerSchedulePermissions
}

export type PrisonerSpecificDomainPermission =
  | PrisonerMoneyPermission
  | PrisonerAdjudicationsPermission
  | PrisonerIncentivesPermission
  | PersonPrisonCategoryPermission
  | PrisonerSchedulePermission
