import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import {
  PersonInterventionsPermission,
  PersonInterventionsPermissions,
} from '../../../../../../types/public/permissions/domains/interventions/personInterventions/PersonInterventionsPermissions'
import csipReadCheck from './csipRead/CSIPReadCheck'

export default function personInterventionsCheck(request: PermissionsCheckRequest): PersonInterventionsPermissions {
  return {
    [PersonInterventionsPermission.read_csip]: csipReadCheck(request),
  }
}
