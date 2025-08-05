import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PrisonerMoneyPermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissions'
import inUsersCaseLoad from '../../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoad'

export default function prisonerMoneyReadCheck(request: PermissionsCheckRequest) {
  return inUsersCaseLoad(PrisonerMoneyPermission.read, request)
}
