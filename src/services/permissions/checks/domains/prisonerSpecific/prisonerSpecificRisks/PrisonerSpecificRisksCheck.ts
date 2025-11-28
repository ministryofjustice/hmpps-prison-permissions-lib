import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import {
  PrisonerSpecificRisksPermission,
  PrisonerSpecificRisksPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerSpecificRisks/PrisonerSpecificRisksPermissions'
import csraAssessmentHistoryReadCheck from './csraRead/CsraAssessmentHistoryReadCheck'
import baseCheck from '../../../baseCheck/BaseCheck'

export default function prisonerSpecificRisksCheck(request: PermissionsCheckRequest): PrisonerSpecificRisksPermissions {
  return {
    [PrisonerSpecificRisksPermission.read_csra_rating]: baseCheck(
      PrisonerSpecificRisksPermission.read_csra_rating,
      request,
    ),
    [PrisonerSpecificRisksPermission.read_csra_assessment_history]: csraAssessmentHistoryReadCheck(request),
  }
}
