import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { PrisonerSpecificDomainPermissions } from '../../../../../types/public/permissions/domains/prisonerSpecific/PrisonerSpecificDomainPermissions'
import prisonerMoneyCheck from './prisonerMoney/PrisonerMoneyCheck'
import prisonerAdjudicationsCheck from './prisonerAdjudications/PrisonerAdjudicationsCheck'
import prisonerIncentivesCheck from './prisonerIncentives/PrisonerIncentivesCheck'
import personPrisonCategoryCheck from './personPrisonCategory/PersonPrisonCategoryCheck'
import prisonerScheduleCheck from './prisonerSchedule/PrisonerScheduleCheck'
import useOfForceCheck from './useOfForce/UseOfForceCheck'
import prisonerAlertsCheck from './personAlerts/PrisonerAlertsCheck'

export default function prisonerSpecificCheck(request: PermissionsCheckRequest): PrisonerSpecificDomainPermissions {
  return {
    prisonerMoney: prisonerMoneyCheck(request),
    prisonerAdjudications: prisonerAdjudicationsCheck(request),
    prisonerIncentives: prisonerIncentivesCheck(request),
    personPrisonCategory: personPrisonCategoryCheck(request),
    prisonerSchedule: prisonerScheduleCheck(request),
    useOfForce: useOfForceCheck(request),
    prisonerAlerts: prisonerAlertsCheck(request),
  }
}
