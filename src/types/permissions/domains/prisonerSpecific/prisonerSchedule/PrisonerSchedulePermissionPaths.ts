import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../utils/Path'
import { PrisonerSchedulePermission } from './PrisonerSchedulePermissions'

// eslint-disable-next-line import/prefer-default-export
export const prisonerSchedulePermissionPaths: Record<PrisonerSchedulePermission, Path<PrisonerPermissions>> = {
  [PrisonerSchedulePermission.edit]: `domainGroups.prisonerSpecific.prisonerSchedule.${PrisonerSchedulePermission.edit}`,
}
