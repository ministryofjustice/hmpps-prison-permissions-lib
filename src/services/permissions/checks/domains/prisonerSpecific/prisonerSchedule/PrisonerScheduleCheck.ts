import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import prisonerAppointmentEditCheck from './prisonerAppointmentEdit/PrisonerAppointmentEditCheck'
import {
  PrisonerSchedulePermission,
  PrisonerSchedulePermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerSchedule/PrisonerSchedulePermissions'
import prisonerActivityEditCheck from './prisonerActivityEdit/PrisonerActivityEditCheck'
import { checkWith } from '../../../../utils/PermissionCheckUtils'
import inUsersCaseLoad from '../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoad'

export default function prisonerScheduleCheck(context: PrisonerPermissionsContext): PrisonerSchedulePermissions {
  const check = checkWith(context)
  return {
    ...check(PrisonerSchedulePermission.read_schedule, inUsersCaseLoad),
    ...check(PrisonerSchedulePermission.edit_appointment, prisonerAppointmentEditCheck),
    ...check(PrisonerSchedulePermission.edit_activity, prisonerActivityEditCheck),
  }
}
