import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { PrisonerMoneyPermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissions'
import inUsersCaseLoad from '../../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoad'

export default function prisonerMoneyReadCheck(request: PermissionsCheckContext) {
  return inUsersCaseLoad(PrisonerMoneyPermission.read, request)
}
