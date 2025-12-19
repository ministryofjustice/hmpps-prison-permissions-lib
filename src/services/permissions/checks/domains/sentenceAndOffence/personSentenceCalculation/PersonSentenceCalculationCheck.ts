import {
  PersonSentenceCalculationPermission,
  PersonSentenceCalculationPermissions,
} from '../../../../../../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import sentenceCalculationReadCheck from './sentenceCalculationRead/SentenceCalculationReadCheck'
import PermissionsCheckContext from '../../../PermissionsCheckContext'
import sentenceCalculationEditAdjustmentCheck from './sentenceCalculationAdjustmentEdit/SentenceCalculationEditAdjustmentCheck'

export default function personSentenceCalculationCheck(
  request: PermissionsCheckContext,
): PersonSentenceCalculationPermissions {
  return {
    [PersonSentenceCalculationPermission.read]: sentenceCalculationReadCheck(request),
    [PersonSentenceCalculationPermission.edit_adjustments]: sentenceCalculationEditAdjustmentCheck(request),
  }
}
