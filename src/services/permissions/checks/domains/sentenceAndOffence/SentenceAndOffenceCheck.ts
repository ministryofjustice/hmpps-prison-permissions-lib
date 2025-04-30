import { SentenceAndOffenceDomainPermissions } from '../../../../../types/permissions/domains/sentenceAndOffence/SentenceAndOffenceDomainPermissions'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import personSentenceCalculationCheck from './personSentenceCalculation/PersonSentenceCalculationCheck'

export default function sentenceAndOffenceCheck(request: PermissionsCheckRequest): SentenceAndOffenceDomainPermissions {
  return {
    personSentenceCalculation: personSentenceCalculationCheck(request),
  }
}
