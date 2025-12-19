import PermissionsCheckContext from '../../../PermissionsCheckContext'
import prisonerAdjudicationsReadCheck from './prisonerAdjudicationsRead/PrisonerAdjudicationsReadCheck'
import {
  PrisonerAdjudicationsPermission,
  PrisonerAdjudicationsPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsPermissions'

export default function prisonerAdjudicationsCheck(request: PermissionsCheckContext): PrisonerAdjudicationsPermissions {
  return {
    [PrisonerAdjudicationsPermission.read]: prisonerAdjudicationsReadCheck(request),
  }
}
