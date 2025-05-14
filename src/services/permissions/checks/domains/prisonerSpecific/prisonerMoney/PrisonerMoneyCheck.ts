import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import {
  PrisonerMoneyPermission,
  PrisonerMoneyPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissions'
import prisonerMoneyReadCheck from './prisonerMoneyRead/PrisonerMoneyReadCheck'

export default function prisonerMoneyCheck(request: PermissionsCheckRequest): PrisonerMoneyPermissions {
  return {
    [PrisonerMoneyPermission.read]: prisonerMoneyReadCheck(request),
  }
}
