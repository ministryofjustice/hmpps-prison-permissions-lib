import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import prisonerIncentivesReadCheck from './prisonerIncentivesRead/PrisonerIncentivesReadCheck'
import {
  PrisonerIncentivesPermission,
  PrisonerIncentivesPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerIncentives/PrisonerIncentivesPermissions'

export default function prisonerIncentivesCheck(request: PermissionsCheckRequest): PrisonerIncentivesPermissions {
  return {
    [PrisonerIncentivesPermission.read]: prisonerIncentivesReadCheck(request),
  }
}
