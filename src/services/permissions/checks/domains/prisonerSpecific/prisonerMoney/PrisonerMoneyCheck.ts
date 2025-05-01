import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import {
  PrisonerMoneyPermission,
  PrisonerMoneyPermissions,
} from '../../../../../../types/permissions/domains/prisonerSpecific/PrisonerMoneyPermissions'
import prisonerMoneyReadCheck from './prisonerMoneyRead/PrisonerMoneyReadCheck'

export default function prisonerMoneyCheck(request: PermissionsCheckRequest): PrisonerMoneyPermissions {
  return {
    [PrisonerMoneyPermission.read]: prisonerMoneyReadCheck(request),
  }
}
