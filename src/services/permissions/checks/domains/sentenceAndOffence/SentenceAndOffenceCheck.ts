import { SentenceAndOffenceDomainPermissions } from '../../../../../types/public/permissions/domains/sentenceAndOffence/SentenceAndOffenceDomainPermissions'
import PermissionsCheckContext from '../../PermissionsCheckContext'
import personSentenceCalculationCheck from './personSentenceCalculation/PersonSentenceCalculationCheck'

export default function sentenceAndOffenceCheck(request: PermissionsCheckContext): SentenceAndOffenceDomainPermissions {
  return {
    personSentenceCalculation: personSentenceCalculationCheck(request),
  }
}
