import { PrisonerBasePermission, PrisonerPermission, PrisonerPermissions } from './PrisonerPermissions'
import { Path } from '../../utils/Path'
import { prisonerSpecificDomainPermissionPaths } from '../domains/prisonerSpecific/PrisonerSpecificDomainPermissionPaths'
import { sentenceAndOffenceDomainPermissionPaths } from '../domains/sentenceAndOffence/SentenceAndOffenceDomainPermissionPaths'
import { runningAPrisonDomainPermissionPaths } from '../domains/runningAPrison/RunningAPrisonDomainPermissionPaths'
import { personDomainPermissionPaths } from '../domains/person/PersonDomainPermissionPaths'
import { securityDomainPermissionPaths } from '../domains/security/SecurityDomainPermissionPaths'
import { probationDomainPermissionPaths } from '../domains/probation/ProbationDomainPermissionPaths'

// eslint-disable-next-line import/prefer-default-export
export const prisonerPermissionPaths: Record<PrisonerPermission, Path<PrisonerPermissions>> = {
  [PrisonerBasePermission.read]: PrisonerBasePermission.read,
  ...personDomainPermissionPaths,
  ...prisonerSpecificDomainPermissionPaths,
  ...probationDomainPermissionPaths,
  ...runningAPrisonDomainPermissionPaths,
  ...securityDomainPermissionPaths,
  ...sentenceAndOffenceDomainPermissionPaths,
}
