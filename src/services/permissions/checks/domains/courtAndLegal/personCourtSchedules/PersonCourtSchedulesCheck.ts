import {
  PersonCourtSchedulesPermission,
  PersonCourtSchedulesPermissions,
} from '../../../../../../types/permissions/domains/courtAndLegal/PersonCourtSchedulesPermissions'
import courtScheduleReadCheck from './courtScheduleRead/CourtScheduleReadCheck'
import PermissionsCheckRequest from '../../../PermissionsCheckRequest'

export default function personCourtScheduleCheck(request: PermissionsCheckRequest): PersonCourtSchedulesPermissions {
  return {
    [PersonCourtSchedulesPermission.read_schedule]: courtScheduleReadCheck(request),
  }
}
