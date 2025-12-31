import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PrisonerSchedulePermission } from './PrisonerSchedulePermissions'

// eslint-disable-next-line import/prefer-default-export
export const prisonerSchedulePermissionPaths: Record<PrisonerSchedulePermission, Path<PrisonerPermissions>> = {
  [PrisonerSchedulePermission.read_schedule]: `domainGroups.prisonerSpecific.prisonerSchedule.${PrisonerSchedulePermission.read_schedule}`,
  [PrisonerSchedulePermission.edit_appointment]: `domainGroups.prisonerSpecific.prisonerSchedule.${PrisonerSchedulePermission.edit_appointment}`,
  [PrisonerSchedulePermission.edit_activity]: `domainGroups.prisonerSpecific.prisonerSchedule.${PrisonerSchedulePermission.edit_activity}`,
}
