import {
  PersonSentenceCalculationPermission,
  PersonSentenceCalculationPermissions,
} from './personSentenceCalculation/PersonSentenceCalculationPermissions'

export interface SentenceAndOffenceDomainPermissions {
  personSentenceCalculation: PersonSentenceCalculationPermissions
}

export type SentenceAndOffenceDomainPermission = PersonSentenceCalculationPermission
