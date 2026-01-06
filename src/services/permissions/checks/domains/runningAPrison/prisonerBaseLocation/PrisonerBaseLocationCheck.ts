import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import moveCellCheck from './moveCell/MoveCellCheck'
import {
  PrisonerBaseLocationPermission,
  PrisonerBaseLocationPermissions,
} from '../../../../../../types/public/permissions/domains/runningAPrison/prisonerBaseLocation/PrisonerBaseLocationPermissions'
import locationDetailsAndHistoryReadCheck from './locationDetailsAndHistoryRead/LocationDetailsAndHistoryReadCheck'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function prisonerBaseLocationCheck(
  context: PrisonerPermissionsContext,
): PrisonerBaseLocationPermissions {
  const check = checkWith(context)
  return {
    ...check(PrisonerBaseLocationPermission.read_location_details, locationDetailsAndHistoryReadCheck),
    ...check(PrisonerBaseLocationPermission.read_location_history, locationDetailsAndHistoryReadCheck),
    ...check(PrisonerBaseLocationPermission.move_cell, moveCellCheck),
  }
}
