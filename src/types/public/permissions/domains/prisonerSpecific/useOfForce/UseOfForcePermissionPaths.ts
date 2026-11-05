import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { UseOfForcePermission } from './UseOfForcePermissions'

export const useOfForcePermissionPaths: Record<UseOfForcePermission, Path<PrisonerPermissions>> = {
  [UseOfForcePermission.edit]: `domainGroups.prisonerSpecific.useOfForce.${UseOfForcePermission.edit}`,
}
