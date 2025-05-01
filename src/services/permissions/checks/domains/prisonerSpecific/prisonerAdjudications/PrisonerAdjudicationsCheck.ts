import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import prisonerAdjudicationsReadCheck from './prisonerAdjudicationsRead/PrisonerAdjudicationsReadCheck'
import {
  PrisonerAdjudicationsPermission,
  PrisonerAdjudicationsPermissions,
} from '../../../../../../types/permissions/domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsPermissions'

export default function prisonerAdjudicationsCheck(request: PermissionsCheckRequest): PrisonerAdjudicationsPermissions {
  return {
    [PrisonerAdjudicationsPermission.read]: prisonerAdjudicationsReadCheck(request),
  }
}
