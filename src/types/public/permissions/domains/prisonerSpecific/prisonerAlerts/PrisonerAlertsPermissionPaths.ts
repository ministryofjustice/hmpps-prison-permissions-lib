import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PrisonerAlertsPermission } from './PrisonerAlertsPermissions'

// eslint-disable-next-line import/prefer-default-export
export const prisonerAlertsPermissionPaths: Record<PrisonerAlertsPermission, Path<PrisonerPermissions>> = {
  [PrisonerAlertsPermission.edit]: `domainGroups.prisonerSpecific.prisonerAlerts.${PrisonerAlertsPermission.edit}`,
}
