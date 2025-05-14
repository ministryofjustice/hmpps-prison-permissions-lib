import { PersonSentenceCalculationPermission } from '../../../../../../../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { Role } from '../../../../../../../types/internal/user/Role'
import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import baseCheckAndUserHasRole from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndUserHasRole'

export default function sentenceCalculationReadCheck(request: PermissionsCheckRequest) {
  return baseCheckAndUserHasRole(Role.ReleaseDatesCalculator, PersonSentenceCalculationPermission.read, request)
}
