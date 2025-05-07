import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../utils/Path'
import { PrisonerIncentivesPermission } from './PrisonerIncentivesPermissions'

// eslint-disable-next-line import/prefer-default-export
export const prisonerIncentivesPermissionPaths: Record<PrisonerIncentivesPermission, Path<PrisonerPermissions>> = {
  [PrisonerIncentivesPermission.read]: `domainGroups.prisonerSpecific.prisonerIncentives.${PrisonerIncentivesPermission.read}`,
}
