import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PersonInterventionsPermission } from '../../../../../../../types/public/permissions/domains/interventions/personInterventions/PersonInterventionsPermissions'
import inUsersCaseLoad from '../../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoad'

export default function csipReadCheck(request: PermissionsCheckRequest) {
  return inUsersCaseLoad(PersonInterventionsPermission.read_csip, request)
}
