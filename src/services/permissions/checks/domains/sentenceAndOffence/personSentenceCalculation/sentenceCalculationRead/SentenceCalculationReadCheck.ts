import { PersonSentenceCalculationPermission } from '../../../../../../../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { Role } from '../../../../../../../types/internal/user/Role'
import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import baseCheckAndUserHasRole from '../../../../sharedChecks/baseCheckAndUserHasRole/BaseCheckAndUserHasRole'

export default function sentenceCalculationReadCheck(request: PermissionsCheckContext) {
  return baseCheckAndUserHasRole(Role.ReleaseDatesCalculator, PersonSentenceCalculationPermission.read, request)
}
