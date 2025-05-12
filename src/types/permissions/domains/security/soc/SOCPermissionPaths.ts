import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../utils/Path'
import { SOCPermission } from './SOCPermissions'

// eslint-disable-next-line import/prefer-default-export
export const socPermissionPaths: Record<SOCPermission, Path<PrisonerPermissions>> = {
  [SOCPermission.read]: `domainGroups.security.soc.${SOCPermission.read}`,
  [SOCPermission.edit]: `domainGroups.security.soc.${SOCPermission.edit}`,
}
