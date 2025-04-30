import {
  PersonSentenceCalculationPermission,
  PersonSentenceCalculationPermissions,
} from '../../../../../../types/permissions/domains/sentenceAndOffence/PersonSentenceCalculationPermissions'
import sentenceCalculationReadCheck from './sentenceCalculationsRead/SentenceCalculationReadCheck'
import PermissionsCheckRequest from '../../../PermissionsCheckRequest'

export default function personSentenceCalculationCheck(
  request: PermissionsCheckRequest,
): PersonSentenceCalculationPermissions {
  return {
    [PersonSentenceCalculationPermission.read]: sentenceCalculationReadCheck(request),
  }
}
