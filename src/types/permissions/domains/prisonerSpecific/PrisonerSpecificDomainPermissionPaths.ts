import { PrisonerSpecificDomainPermission } from './PrisonerSpecificDomainPermissions'
import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { Path } from '../../../utils/Path'
import { prisonerAdjudicationsPermissionPaths } from './prisonerAdjudications/PrisonerAdjudicationsPermissionPaths'
import { prisonerMoneyPermissionPaths } from './prisonerMoney/PrisonerMoneyPermissionPaths'
import { prisonerIncentivesPermissionPaths } from './prisonerIncentives/PrisonerIncentivesPermissionPaths'
import { personPrisonCategoryPermissionPaths } from './personPrisonCategory/PersonPrisonCategoryPermissionPaths'
import { prisonerSchedulePermissionPaths } from './prisonerSchedule/PrisonerSchedulePermissionPaths'
import { useOfForcePermissionPaths } from './useOfForce/UseOfForcePermissionPaths'

// eslint-disable-next-line import/prefer-default-export
export const prisonerSpecificDomainPermissionPaths: Record<
  PrisonerSpecificDomainPermission,
  Path<PrisonerPermissions>
> = {
  ...prisonerMoneyPermissionPaths,
  ...prisonerAdjudicationsPermissionPaths,
  ...prisonerIncentivesPermissionPaths,
  ...personPrisonCategoryPermissionPaths,
  ...prisonerSchedulePermissionPaths,
  ...useOfForcePermissionPaths,
}
