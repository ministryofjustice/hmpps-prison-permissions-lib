import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import {
  PrisonerIncentivesPermission,
  PrisonerIncentivesPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerIncentives/PrisonerIncentivesPermissions'
import baseCheck from '../../../baseCheck/BaseCheck'
import incentiveLevelHistoryReadCheck from './incentiveLevelHistoryRead/IncentiveLevelHistoryReadCheck'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function prisonerIncentivesCheck(context: PrisonerPermissionsContext): PrisonerIncentivesPermissions {
  const check = checkWith(context)
  return {
    ...check(PrisonerIncentivesPermission.read_incentive_level, baseCheck),
    ...check(PrisonerIncentivesPermission.read_incentive_level_history, incentiveLevelHistoryReadCheck),
  }
}
