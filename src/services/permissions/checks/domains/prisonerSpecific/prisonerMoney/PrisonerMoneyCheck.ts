import PermissionsCheckContext from '../../../PermissionsCheckContext'
import {
  PrisonerMoneyPermission,
  PrisonerMoneyPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissions'
import prisonerMoneyReadCheck from './prisonerMoneyRead/PrisonerMoneyReadCheck'

export default function prisonerMoneyCheck(request: PermissionsCheckContext): PrisonerMoneyPermissions {
  return {
    [PrisonerMoneyPermission.read]: prisonerMoneyReadCheck(request),
  }
}
