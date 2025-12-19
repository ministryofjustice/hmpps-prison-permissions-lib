import PermissionsCheckContext from '../../../PermissionsCheckContext'
import prisonerAlertsEditCheck from './prisonerAlertsEdit/PrisonerAlertsEditCheck'
import {
  PrisonerAlertsPermission,
  PrisonerAlertsPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerAlerts/PrisonerAlertsPermissions'

export default function prisonerAlertsCheck(request: PermissionsCheckContext): PrisonerAlertsPermissions {
  return {
    [PrisonerAlertsPermission.edit]: prisonerAlertsEditCheck(request),
  }
}
