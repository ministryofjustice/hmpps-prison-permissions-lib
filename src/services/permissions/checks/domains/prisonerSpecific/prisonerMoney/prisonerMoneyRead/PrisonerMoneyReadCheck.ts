import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PrisonerMoneyPermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissions'
import baseCheckAndInUsersCaseLoad from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndInUsersCaseLoad'

export default function prisonerMoneyReadCheck(request: PermissionsCheckRequest) {
  return baseCheckAndInUsersCaseLoad(PrisonerMoneyPermission.read, request)
}
