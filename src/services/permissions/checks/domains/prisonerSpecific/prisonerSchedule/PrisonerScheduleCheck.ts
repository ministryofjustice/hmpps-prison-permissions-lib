import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import prisonerAppointmentEditCheck from './prisonerAppointmentEdit/PrisonerAppointmentEditCheck'
import {
  PrisonerSchedulePermission,
  PrisonerSchedulePermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerSchedule/PrisonerSchedulePermissions'
import prisonerActivityEditCheck from './prisonerActivityEdit/PrisonerActivityEditCheck'

export default function prisonerScheduleCheck(request: PermissionsCheckRequest): PrisonerSchedulePermissions {
  return {
    [PrisonerSchedulePermission.edit_appointment]: prisonerAppointmentEditCheck(request),
    [PrisonerSchedulePermission.edit_activity]: prisonerActivityEditCheck(request),
  }
}
