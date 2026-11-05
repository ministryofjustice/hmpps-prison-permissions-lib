import { SentenceAndOffenceDomainPermission } from './SentenceAndOffenceDomainPermissions'
import { Path } from '../../../../internal/utils/Path'
import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { personSentenceCalculationPermissionPaths } from './personSentenceCalculation/PersonSentenceCalculationPermissionPaths'

export const sentenceAndOffenceDomainPermissionPaths: Record<
  SentenceAndOffenceDomainPermission,
  Path<PrisonerPermissions>
> = {
  ...personSentenceCalculationPermissionPaths,
}
