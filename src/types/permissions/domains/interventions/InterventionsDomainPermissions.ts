import {
  PersonInterventionsPermission,
  PersonInterventionsPermissions,
} from './personInterventions/PersonInterventionsPermissions'

export interface InterventionsDomainPermissions {
  personInterventions: PersonInterventionsPermissions
}

export type InterventionsDomainPermission = PersonInterventionsPermission
