import { SentenceAndOffenceDomainPermissions } from '../../../../../types/public/permissions/domains/sentenceAndOffence/SentenceAndOffenceDomainPermissions'
import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'
import personSentenceCalculationCheck from './personSentenceCalculation/PersonSentenceCalculationCheck'

export default function sentenceAndOffenceCheck(
  context: PrisonerPermissionsContext,
): SentenceAndOffenceDomainPermissions {
  return {
    personSentenceCalculation: personSentenceCalculationCheck(context),
  }
}
