import { PrisonerBasePermission, PrisonerPermission, PrisonerPermissions } from './PrisonerPermissions'
import { Path } from '../../utils/Path'
import { prisonerSpecificDomainPermissionPaths } from '../domains/prisonerSpecific/PrisonerSpecificDomainPermissionPaths'
import { sentenceAndOffenceDomainPermissionPaths } from '../domains/sentenceAndOffence/SentenceAndOffenceDomainPermissionPaths'
import { runningAPrisonDomainPermissionPaths } from '../domains/runningAPrison/RunningAPrisonDomainPermissionPaths'

// eslint-disable-next-line import/prefer-default-export
export const prisonerPermissionPaths: Record<PrisonerPermission, Path<PrisonerPermissions>> = {
  [PrisonerBasePermission.read]: PrisonerBasePermission.read,
  ...prisonerSpecificDomainPermissionPaths,
  ...sentenceAndOffenceDomainPermissionPaths,
  ...runningAPrisonDomainPermissionPaths,
}
