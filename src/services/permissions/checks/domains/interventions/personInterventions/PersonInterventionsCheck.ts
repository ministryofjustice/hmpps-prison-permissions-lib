import PermissionsCheckContext from '../../../PermissionsCheckContext'
import {
  PersonInterventionsPermission,
  PersonInterventionsPermissions,
} from '../../../../../../types/public/permissions/domains/interventions/personInterventions/PersonInterventionsPermissions'
import inUsersCaseLoad from '../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoad'

export default function personInterventionsCheck(context: PermissionsCheckContext): PersonInterventionsPermissions {
  return {
    [PersonInterventionsPermission.read_csip]: inUsersCaseLoad(PersonInterventionsPermission.read_csip, context),
  }
}
