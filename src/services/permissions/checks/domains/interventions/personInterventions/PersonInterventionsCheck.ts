import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import {
  PersonInterventionsPermission,
  PersonInterventionsPermissions,
} from '../../../../../../types/permissions/domains/interventions/personInterventions/PersonInterventionsPermissions'
import csipReadCheck from './csipRead/CSIPReadCheck'

export default function personInterventionsCheck(request: PermissionsCheckRequest): PersonInterventionsPermissions {
  return {
    [PersonInterventionsPermission.read_csip]: csipReadCheck(request),
  }
}
