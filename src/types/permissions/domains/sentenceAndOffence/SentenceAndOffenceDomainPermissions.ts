import {
  PersonSentenceCalculationPermission,
  PersonSentenceCalculationPermissions,
} from './PersonSentenceCalculationPermissions'

export interface SentenceAndOffenceDomainPermissions {
  // Not a full list, for demonstration purposes at the moment:
  personSentenceCalculation: PersonSentenceCalculationPermissions
}

export type SentenceAndOffenceDomainPermission = PersonSentenceCalculationPermission
