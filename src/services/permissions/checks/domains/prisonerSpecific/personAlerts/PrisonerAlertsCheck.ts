import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import prisonerAlertsEditCheck from './prisonerAlertsEdit/PrisonerAlertsEditCheck'
import {
  PrisonerAlertsPermission,
  PrisonerAlertsPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerAlerts/PrisonerAlertsPermissions'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function prisonerAlertsCheck(context: PrisonerPermissionsContext): PrisonerAlertsPermissions {
  const check = checkWith(context)
  return {
    ...check(PrisonerAlertsPermission.edit, prisonerAlertsEditCheck),
  }
}
