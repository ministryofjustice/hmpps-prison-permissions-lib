import {
  PersonSentenceCalculationPermission,
  PersonSentenceCalculationPermissions,
} from '../../../../../../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import sentenceCalculationReadCheck from './sentenceCalculationRead/SentenceCalculationReadCheck'
import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import sentenceCalculationEditAdjustmentCheck from './sentenceCalculationAdjustmentEdit/SentenceCalculationEditAdjustmentCheck'

export default function personSentenceCalculationCheck(
  request: PermissionsCheckRequest,
): PersonSentenceCalculationPermissions {
  return {
    [PersonSentenceCalculationPermission.read]: sentenceCalculationReadCheck(request),
    [PersonSentenceCalculationPermission.edit_adjustments]: sentenceCalculationEditAdjustmentCheck(request),
  }
}
