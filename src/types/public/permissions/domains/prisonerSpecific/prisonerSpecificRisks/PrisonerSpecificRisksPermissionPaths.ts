import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { PrisonerSpecificRisksPermission } from './PrisonerSpecificRisksPermissions'
import { Path } from '../../../../../internal/utils/Path'

export const prisonerSpecificRisksPermissionPaths: Record<
  PrisonerSpecificRisksPermission,
  Path<PrisonerPermissions>
> = {
  [PrisonerSpecificRisksPermission.read_csra_rating]: `domainGroups.prisonerSpecific.prisonerSpecificRisks.${PrisonerSpecificRisksPermission.read_csra_rating}`,
  [PrisonerSpecificRisksPermission.read_csra_assessment_history]: `domainGroups.prisonerSpecific.prisonerSpecificRisks.${PrisonerSpecificRisksPermission.read_csra_assessment_history}`,
}
