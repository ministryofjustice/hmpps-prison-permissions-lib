import PermissionsCheckContext from '../../../PermissionsCheckContext'
import {
  PrisonerIncentivesPermission,
  PrisonerIncentivesPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerIncentives/PrisonerIncentivesPermissions'
import baseCheck from '../../../baseCheck/BaseCheck'
import incentiveLevelHistoryReadCheck from './incentiveLevelHistoryRead/IncentiveLevelHistoryReadCheck'

export default function prisonerIncentivesCheck(request: PermissionsCheckContext): PrisonerIncentivesPermissions {
  return {
    [PrisonerIncentivesPermission.read_incentive_level]: baseCheck(
      PrisonerIncentivesPermission.read_incentive_level,
      request,
    ),
    [PrisonerIncentivesPermission.read_incentive_level_history]: incentiveLevelHistoryReadCheck(request),
  }
}
