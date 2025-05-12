import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { InterventionsDomainPermissions } from '../../../../../types/permissions/domains/interventions/InterventionsDomainPermissions'
import personInterventionsCheck from './personInterventions/PersonInterventionsCheck'

export default function interventionsCheck(request: PermissionsCheckRequest): InterventionsDomainPermissions {
  return {
    personInterventions: personInterventionsCheck(request),
  }
}
