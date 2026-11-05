import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PrisonerAlertsPermission } from './PrisonerAlertsPermissions'

export const prisonerAlertsPermissionPaths: Record<PrisonerAlertsPermission, Path<PrisonerPermissions>> = {
  [PrisonerAlertsPermission.edit]: `domainGroups.prisonerSpecific.prisonerAlerts.${PrisonerAlertsPermission.edit}`,
}
