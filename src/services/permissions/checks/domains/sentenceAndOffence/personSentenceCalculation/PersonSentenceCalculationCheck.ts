import {
  PersonSentenceCalculationPermission,
  PersonSentenceCalculationPermissions,
} from '../../../../../../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import sentenceCalculationEditCheck from './sentenceCalculationEdit/SentenceCalculationEditCheck'
import sentenceCalculationEditAdjustmentCheck from './sentenceCalculationAdjustmentEdit/SentenceCalculationEditAdjustmentCheck'
import baseCheck from '../../../baseCheck/BaseCheck'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function personSentenceCalculationCheck(
  context: PrisonerPermissionsContext,
): PersonSentenceCalculationPermissions {
  const check = checkWith(context)
  return {
    ...check(PersonSentenceCalculationPermission.read, baseCheck),
    ...check(PersonSentenceCalculationPermission.edit, sentenceCalculationEditCheck),
    ...check(PersonSentenceCalculationPermission.edit_adjustments, sentenceCalculationEditAdjustmentCheck),
  }
}
