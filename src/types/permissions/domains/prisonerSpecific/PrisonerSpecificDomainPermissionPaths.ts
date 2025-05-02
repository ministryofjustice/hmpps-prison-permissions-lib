import { PrisonerSpecificDomainPermission } from './PrisonerSpecificDomainPermissions'
import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { Path } from '../../../utils/Path'
import { prisonerAdjudicationsPermissionPaths } from './prisonerAdjudications/PrisonerAdjudicationsPermissionPaths'
import { prisonerMoneyPermissionPaths } from './prisonerMoney/PrisonerMoneyPermissionPaths'

// eslint-disable-next-line import/prefer-default-export
export const prisonerSpecificDomainPermissionPaths: Record<
  PrisonerSpecificDomainPermission,
  Path<PrisonerPermissions>
> = {
  ...prisonerMoneyPermissionPaths,
  ...prisonerAdjudicationsPermissionPaths,
}
