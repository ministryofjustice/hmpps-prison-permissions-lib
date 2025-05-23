import { PersonSentenceCalculationPermission } from '../../../../../../../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { Role } from '../../../../../../../types/internal/user/Role'
import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import baseCheckAndUserHasRole from '../../../../sharedChecks/baseCheckAndUserHasRole/BaseCheckAndUserHasRole'

export default function sentenceCalculationEditAdjustmentCheck(request: PermissionsCheckRequest) {
  return baseCheckAndUserHasRole(
    Role.AdjustmentsMaintainer,
    PersonSentenceCalculationPermission.edit_adjustments,
    request,
  )
}
