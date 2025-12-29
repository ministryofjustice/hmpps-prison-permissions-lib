import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { InterventionsDomainPermissions } from '../../../../../types/public/permissions/domains/interventions/InterventionsDomainPermissions'
import personInterventionsCheck from './personInterventions/PersonInterventionsCheck'

export default function interventionsCheck(context: PrisonerPermissionsContext): InterventionsDomainPermissions {
  return {
    personInterventions: personInterventionsCheck(context),
  }
}
