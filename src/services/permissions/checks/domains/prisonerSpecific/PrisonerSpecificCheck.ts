import PermissionsCheckContext from '../../PermissionsCheckContext'
import { PrisonerSpecificDomainPermissions } from '../../../../../types/public/permissions/domains/prisonerSpecific/PrisonerSpecificDomainPermissions'
import prisonerMoneyCheck from './prisonerMoney/PrisonerMoneyCheck'
import prisonerAdjudicationsCheck from './prisonerAdjudications/PrisonerAdjudicationsCheck'
import prisonerIncentivesCheck from './prisonerIncentives/PrisonerIncentivesCheck'
import personPrisonCategoryCheck from './personPrisonCategory/PersonPrisonCategoryCheck'
import prisonerScheduleCheck from './prisonerSchedule/PrisonerScheduleCheck'
import useOfForceCheck from './useOfForce/UseOfForceCheck'
import prisonerAlertsCheck from './personAlerts/PrisonerAlertsCheck'
import prisonerSpecificRisksCheck from './prisonerSpecificRisks/PrisonerSpecificRisksCheck'

export default function prisonerSpecificCheck(request: PermissionsCheckContext): PrisonerSpecificDomainPermissions {
  return {
    prisonerMoney: prisonerMoneyCheck(request),
    prisonerAdjudications: prisonerAdjudicationsCheck(request),
    prisonerIncentives: prisonerIncentivesCheck(request),
    personPrisonCategory: personPrisonCategoryCheck(request),
    prisonerSchedule: prisonerScheduleCheck(request),
    useOfForce: useOfForceCheck(request),
    prisonerAlerts: prisonerAlertsCheck(request),
    prisonerSpecificRisks: prisonerSpecificRisksCheck(request),
  }
}
