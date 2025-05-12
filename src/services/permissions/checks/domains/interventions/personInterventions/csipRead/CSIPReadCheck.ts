import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PersonInterventionsPermission } from '../../../../../../../types/permissions/domains/interventions/personInterventions/PersonInterventionsPermissions'
import baseCheckAndInUsersCaseLoad from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndInUsersCaseLoad'

export default function csipReadCheck(request: PermissionsCheckRequest) {
  return baseCheckAndInUsersCaseLoad(PersonInterventionsPermission.read_csip, request)
}
