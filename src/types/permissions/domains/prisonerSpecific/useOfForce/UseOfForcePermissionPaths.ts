import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../utils/Path'
import { UseOfForcePermission } from './UseOfForcePermissions'

// eslint-disable-next-line import/prefer-default-export
export const useOfForcePermissionPaths: Record<UseOfForcePermission, Path<PrisonerPermissions>> = {
  [UseOfForcePermission.edit]: `domainGroups.prisonerSpecific.useOfForce.${UseOfForcePermission.edit}`,
}
