import { Path } from '../../../../../internal/utils/Path'
import { PersonSentenceCalculationPermission } from './PersonSentenceCalculationPermissions'
import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'

// eslint-disable-next-line import/prefer-default-export
export const personSentenceCalculationPermissionPaths: Record<
  PersonSentenceCalculationPermission,
  Path<PrisonerPermissions>
> = {
  [PersonSentenceCalculationPermission.read]: `domainGroups.sentenceAndOffence.personSentenceCalculation.${PersonSentenceCalculationPermission.read}`,
  [PersonSentenceCalculationPermission.edit_adjustments]: `domainGroups.sentenceAndOffence.personSentenceCalculation.${PersonSentenceCalculationPermission.edit_adjustments}`,
}
