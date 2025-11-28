import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import {
  PersonInterventionsPermission,
  PersonInterventionsPermissions,
} from '../../../../../../types/public/permissions/domains/interventions/personInterventions/PersonInterventionsPermissions'
import inUsersCaseLoad from '../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoad'

export default function personInterventionsCheck(request: PermissionsCheckRequest): PersonInterventionsPermissions {
  return {
    [PersonInterventionsPermission.read_csip]: inUsersCaseLoad(PersonInterventionsPermission.read_csip, request),
  }
}
