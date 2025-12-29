import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import {
  PrisonerSpecificRisksPermission,
  PrisonerSpecificRisksPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerSpecificRisks/PrisonerSpecificRisksPermissions'
import csraAssessmentHistoryReadCheck from './csraRead/CsraAssessmentHistoryReadCheck'
import baseCheck from '../../../baseCheck/BaseCheck'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function prisonerSpecificRisksCheck(
  context: PrisonerPermissionsContext,
): PrisonerSpecificRisksPermissions {
  const check = checkWith(context)
  return {
    ...check(PrisonerSpecificRisksPermission.read_csra_rating, baseCheck),
    ...check(PrisonerSpecificRisksPermission.read_csra_assessment_history, csraAssessmentHistoryReadCheck),
  }
}
