import PermissionsCheckContext from '../../PermissionsCheckContext'
import { InterventionsDomainPermissions } from '../../../../../types/public/permissions/domains/interventions/InterventionsDomainPermissions'
import personInterventionsCheck from './personInterventions/PersonInterventionsCheck'

export default function interventionsCheck(context: PermissionsCheckContext): InterventionsDomainPermissions {
  return {
    personInterventions: personInterventionsCheck(context),
  }
}
