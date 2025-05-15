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
import { UseOfForcePermission, UseOfForcePermissions } from './useOfForce/UseOfForcePermissions'
import { PrisonerAlertsPermission, PrisonerAlertsPermissions } from './prisonerAlerts/PrisonerAlertsPermissions'

export interface PrisonerSpecificDomainPermissions {
  prisonerMoney: PrisonerMoneyPermissions
  prisonerAdjudications: PrisonerAdjudicationsPermissions
  prisonerIncentives: PrisonerIncentivesPermissions
  personPrisonCategory: PersonPrisonCategoryPermissions
  prisonerSchedule: PrisonerSchedulePermissions
  useOfForce: UseOfForcePermissions
  prisonerAlerts: PrisonerAlertsPermissions
}

export type PrisonerSpecificDomainPermission =
  | PrisonerMoneyPermission
  | PrisonerAdjudicationsPermission
  | PrisonerIncentivesPermission
  | PersonPrisonCategoryPermission
  | PrisonerSchedulePermission
  | UseOfForcePermission
  | PrisonerAlertsPermission
