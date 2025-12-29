import {
  PersonSentenceCalculationPermission,
  PersonSentenceCalculationPermissions,
} from '../../../../../../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import sentenceCalculationReadCheck from './sentenceCalculationRead/SentenceCalculationReadCheck'
import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import sentenceCalculationEditAdjustmentCheck from './sentenceCalculationAdjustmentEdit/SentenceCalculationEditAdjustmentCheck'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function personSentenceCalculationCheck(
  context: PrisonerPermissionsContext,
): PersonSentenceCalculationPermissions {
  const check = checkWith(context)
  return {
    ...check(PersonSentenceCalculationPermission.read, sentenceCalculationReadCheck),
    ...check(PersonSentenceCalculationPermission.edit_adjustments, sentenceCalculationEditAdjustmentCheck),
  }
}
