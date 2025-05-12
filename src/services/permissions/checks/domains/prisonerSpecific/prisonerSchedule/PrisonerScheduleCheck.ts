import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import prisonerScheduleEditCheck from './prisonerScheduleEdit/PrisonerScheduleEditCheck'
import {
  PrisonerSchedulePermission,
  PrisonerSchedulePermissions,
} from '../../../../../../types/permissions/domains/prisonerSpecific/prisonerSchedule/PrisonerSchedulePermissions'

export default function prisonerScheduleCheck(request: PermissionsCheckRequest): PrisonerSchedulePermissions {
  return {
    [PrisonerSchedulePermission.edit]: prisonerScheduleEditCheck(request),
  }
}
