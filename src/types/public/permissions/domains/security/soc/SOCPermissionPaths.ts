import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { SOCPermission } from './SOCPermissions'

export const socPermissionPaths: Record<SOCPermission, Path<PrisonerPermissions>> = {
  [SOCPermission.read]: `domainGroups.security.soc.${SOCPermission.read}`,
  [SOCPermission.edit]: `domainGroups.security.soc.${SOCPermission.edit}`,
}
