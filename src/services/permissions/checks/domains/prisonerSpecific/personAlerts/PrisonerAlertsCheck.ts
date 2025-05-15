import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import prisonerAlertsEditCheck from './prisonerAlertsEdit/PrisonerAlertsEditCheck'
import {
  PrisonerAlertsPermission,
  PrisonerAlertsPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerAlerts/PrisonerAlertsPermissions'

export default function prisonerAlertsCheck(request: PermissionsCheckRequest): PrisonerAlertsPermissions {
  return {
    [PrisonerAlertsPermission.edit]: prisonerAlertsEditCheck(request),
  }
}
