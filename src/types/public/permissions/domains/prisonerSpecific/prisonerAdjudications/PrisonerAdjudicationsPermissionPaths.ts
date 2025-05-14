import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PrisonerAdjudicationsPermission } from './PrisonerAdjudicationsPermissions'

// eslint-disable-next-line import/prefer-default-export
export const prisonerAdjudicationsPermissionPaths: Record<
  PrisonerAdjudicationsPermission,
  Path<PrisonerPermissions>
> = {
  [PrisonerAdjudicationsPermission.read]: `domainGroups.prisonerSpecific.prisonerAdjudications.${PrisonerAdjudicationsPermission.read}`,
}
