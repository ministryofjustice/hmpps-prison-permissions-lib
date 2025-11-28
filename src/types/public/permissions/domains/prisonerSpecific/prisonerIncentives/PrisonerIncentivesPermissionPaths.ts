import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PrisonerIncentivesPermission } from './PrisonerIncentivesPermissions'

// eslint-disable-next-line import/prefer-default-export
export const prisonerIncentivesPermissionPaths: Record<PrisonerIncentivesPermission, Path<PrisonerPermissions>> = {
  [PrisonerIncentivesPermission.read_incentive_level]: `domainGroups.prisonerSpecific.prisonerIncentives.${PrisonerIncentivesPermission.read_incentive_level}`,
  [PrisonerIncentivesPermission.read_incentive_level_history]: `domainGroups.prisonerSpecific.prisonerIncentives.${PrisonerIncentivesPermission.read_incentive_level_history}`,
}
