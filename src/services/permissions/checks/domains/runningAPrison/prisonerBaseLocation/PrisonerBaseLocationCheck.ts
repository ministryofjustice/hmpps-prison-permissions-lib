import PermissionsCheckContext from '../../../PermissionsCheckContext'
import moveCellCheck from './moveCell/MoveCellCheck'
import {
  PrisonerBaseLocationPermission,
  PrisonerBaseLocationPermissions,
} from '../../../../../../types/public/permissions/domains/runningAPrison/prisonerBaseLocation/PrisonerBaseLocationPermissions'
import locationDetailsAndHistoryReadCheck from './locationDetailsAndHistoryRead/LocationDetailsAndHistoryReadCheck'

export default function prisonerBaseLocationCheck(request: PermissionsCheckContext): PrisonerBaseLocationPermissions {
  return {
    [PrisonerBaseLocationPermission.read_location_details]: locationDetailsAndHistoryReadCheck(
      PrisonerBaseLocationPermission.read_location_details,
      request,
    ),
    [PrisonerBaseLocationPermission.read_location_history]: locationDetailsAndHistoryReadCheck(
      PrisonerBaseLocationPermission.read_location_history,
      request,
    ),

    [PrisonerBaseLocationPermission.move_cell]: moveCellCheck(request),
  }
}
