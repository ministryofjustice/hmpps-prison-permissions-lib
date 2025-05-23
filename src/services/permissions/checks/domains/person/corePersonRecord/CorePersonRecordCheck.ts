import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import {
  CorePersonRecordPermission,
  CorePersonRecordPermissions,
} from '../../../../../../types/public/permissions/domains/person/corePersonRecord/CorePersonRecordPermissions'
import baseCheck from '../../../baseCheck/BaseCheck'
import prisonerProfileEditCheck from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheck'

export default function corePersonRecordCheck(request: PermissionsCheckRequest): CorePersonRecordPermissions {
  return {
    ...readCheck(CorePersonRecordPermission.read_physical_characteristics, request),
    ...editCheck(CorePersonRecordPermission.edit_physical_characteristics, request),

    ...readCheck(CorePersonRecordPermission.read_photo, request),
    ...editCheck(CorePersonRecordPermission.edit_photo, request),

    ...readCheck(CorePersonRecordPermission.read_place_of_birth, request),
    ...editCheck(CorePersonRecordPermission.edit_place_of_birth, request),

    ...readCheck(CorePersonRecordPermission.read_military_history, request),
    ...editCheck(CorePersonRecordPermission.edit_military_history, request),

    ...readCheck(CorePersonRecordPermission.read_name_and_aliases, request),
    ...editCheck(CorePersonRecordPermission.edit_name_and_aliases, request),

    ...readCheck(CorePersonRecordPermission.read_date_of_birth, request),
    ...editCheck(CorePersonRecordPermission.edit_date_of_birth, request),

    ...readCheck(CorePersonRecordPermission.read_address, request),
    ...editCheck(CorePersonRecordPermission.edit_address, request),

    ...readCheck(CorePersonRecordPermission.read_nationality, request),
    ...editCheck(CorePersonRecordPermission.edit_nationality, request),

    ...readCheck(CorePersonRecordPermission.read_identifiers, request),
    ...editCheck(CorePersonRecordPermission.edit_identifiers, request),
  }
}

function readCheck<P extends keyof CorePersonRecordPermissions>(
  permission: P,
  request: PermissionsCheckRequest,
): Pick<CorePersonRecordPermissions, P> {
  return { [permission]: baseCheck(permission, request) } as Pick<CorePersonRecordPermissions, P>
}

function editCheck<P extends keyof CorePersonRecordPermissions>(
  permission: P,
  request: PermissionsCheckRequest,
): Pick<CorePersonRecordPermissions, P> {
  return { [permission]: prisonerProfileEditCheck(permission, request) } as Pick<CorePersonRecordPermissions, P>
}
