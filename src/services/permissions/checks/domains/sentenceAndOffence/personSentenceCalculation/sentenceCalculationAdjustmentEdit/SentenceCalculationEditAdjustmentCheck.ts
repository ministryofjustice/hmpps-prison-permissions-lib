import { PersonSentenceCalculationPermission } from '../../../../../../../types/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { Role } from '../../../../../../../types/user/Role'
import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import baseCheckAndUserHasRole from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndUserHasRole'

export default function sentenceCalculationEditAdjustmentCheck(request: PermissionsCheckRequest) {
  return baseCheckAndUserHasRole(
    Role.AdjustmentsMaintainer,
    PersonSentenceCalculationPermission.edit_adjustments,
    request,
  )
}
