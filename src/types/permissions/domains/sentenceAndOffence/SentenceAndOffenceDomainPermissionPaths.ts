import { SentenceAndOffenceDomainPermission } from './SentenceAndOffenceDomainPermissions'
import { Path } from '../../../utils/Path'
import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { personSentenceCalculationPermissionPaths } from './personSentenceCalculation/PersonSentenceCalculationPermissionPaths'

// eslint-disable-next-line import/prefer-default-export
export const sentenceAndOffenceDomainPermissionPaths: Record<
  SentenceAndOffenceDomainPermission,
  Path<PrisonerPermissions>
> = {
  ...personSentenceCalculationPermissionPaths,
}
