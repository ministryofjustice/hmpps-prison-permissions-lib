import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import {
  CorePersonRecordPermission,
  CorePersonRecordPermissions,
} from '../../../../../../types/public/permissions/domains/person/corePersonRecord/CorePersonRecordPermissions'
import baseCheck from '../../../baseCheck/BaseCheck'
import prisonerProfileEditCheck from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheck'
import prisonerProfileSensitiveEditCheck from '../../../sharedChecks/prisonerProfileSensitiveEditCheck/PrisonerProfileSensitiveEditCheck'

export default function corePersonRecordCheck(request: PermissionsCheckRequest): CorePersonRecordPermissions {
  return {
    ...readCheck(CorePersonRecordPermission.read_physical_characteristics, request),
    ...editCheck(CorePersonRecordPermission.edit_physical_characteristics, request),

    ...readCheck(CorePersonRecordPermission.read_photo, request),
    ...sensitiveEditCheck(CorePersonRecordPermission.edit_photo, request),

    ...readCheck(CorePersonRecordPermission.read_place_of_birth, request),
    ...sensitiveEditCheck(CorePersonRecordPermission.edit_place_of_birth, request),

    ...readCheck(CorePersonRecordPermission.read_military_history, request),
    ...editCheck(CorePersonRecordPermission.edit_military_history, request),

    ...readCheck(CorePersonRecordPermission.read_name_and_aliases, request),
    ...sensitiveEditCheck(CorePersonRecordPermission.edit_name_and_aliases, request),

    ...readCheck(CorePersonRecordPermission.read_date_of_birth, request),
    ...sensitiveEditCheck(CorePersonRecordPermission.edit_date_of_birth, request),

    ...readCheck(CorePersonRecordPermission.read_address, request),
    ...sensitiveEditCheck(CorePersonRecordPermission.edit_address, request),

    ...readCheck(CorePersonRecordPermission.read_nationality, request),
    ...sensitiveEditCheck(CorePersonRecordPermission.edit_nationality, request),

    ...readCheck(CorePersonRecordPermission.read_identifiers, request),
    ...sensitiveEditCheck(CorePersonRecordPermission.edit_identifiers, request),

    ...readCheck(CorePersonRecordPermission.read_phone_numbers, request),
    ...sensitiveEditCheck(CorePersonRecordPermission.edit_phone_numbers, request),

    ...readCheck(CorePersonRecordPermission.read_email_addresses, request),
    ...sensitiveEditCheck(CorePersonRecordPermission.edit_email_addresses, request),

    ...readCheck(CorePersonRecordPermission.read_distinguishing_marks, request),
    ...sensitiveEditCheck(CorePersonRecordPermission.edit_distinguishing_marks, request),
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

function sensitiveEditCheck<P extends keyof CorePersonRecordPermissions>(
  permission: P,
  request: PermissionsCheckRequest,
): Pick<CorePersonRecordPermissions, P> {
  return { [permission]: prisonerProfileSensitiveEditCheck(permission, request) } as Pick<
    CorePersonRecordPermissions,
    P
  >
}
