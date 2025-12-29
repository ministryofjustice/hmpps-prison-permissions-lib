import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { PrisonerSpecificDomainPermissions } from '../../../../../types/public/permissions/domains/prisonerSpecific/PrisonerSpecificDomainPermissions'
import prisonerMoneyCheck from './prisonerMoney/PrisonerMoneyCheck'
import prisonerAdjudicationsCheck from './prisonerAdjudications/PrisonerAdjudicationsCheck'
import prisonerIncentivesCheck from './prisonerIncentives/PrisonerIncentivesCheck'
import personPrisonCategoryCheck from './personPrisonCategory/PersonPrisonCategoryCheck'
import prisonerScheduleCheck from './prisonerSchedule/PrisonerScheduleCheck'
import useOfForceCheck from './useOfForce/UseOfForceCheck'
import prisonerAlertsCheck from './personAlerts/PrisonerAlertsCheck'
import prisonerSpecificRisksCheck from './prisonerSpecificRisks/PrisonerSpecificRisksCheck'

export default function prisonerSpecificCheck(context: PrisonerPermissionsContext): PrisonerSpecificDomainPermissions {
  return {
    prisonerMoney: prisonerMoneyCheck(context),
    prisonerAdjudications: prisonerAdjudicationsCheck(context),
    prisonerIncentives: prisonerIncentivesCheck(context),
    personPrisonCategory: personPrisonCategoryCheck(context),
    prisonerSchedule: prisonerScheduleCheck(context),
    useOfForce: useOfForceCheck(context),
    prisonerAlerts: prisonerAlertsCheck(context),
    prisonerSpecificRisks: prisonerSpecificRisksCheck(context),
  }
}
