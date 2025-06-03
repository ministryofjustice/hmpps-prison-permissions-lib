import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import baseCheck from '../../../baseCheck/BaseCheck'
import prisonerProfileEditCheck from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheck'
import {
  PersonProtectedCharacteristicsPermission,
  PersonProtectedCharacteristicsPermissions,
} from '../../../../../../types/public/permissions/domains/person/personProtectedCharacteristics/PersonProtectedCharacteristicsPermissions'

export default function personProtectedCharacteristicsCheck(
  request: PermissionsCheckRequest,
): PersonProtectedCharacteristicsPermissions {
  return {
    ...readCheck(PersonProtectedCharacteristicsPermission.read_sexual_orientation, request),
    ...editCheck(PersonProtectedCharacteristicsPermission.edit_sexual_orientation, request),

    ...readCheck(PersonProtectedCharacteristicsPermission.read_religion_and_belief, request),
    ...editCheck(PersonProtectedCharacteristicsPermission.edit_religion_and_belief, request),

    ...readCheck(PersonProtectedCharacteristicsPermission.read_ethnicity, request),
    ...editCheck(PersonProtectedCharacteristicsPermission.edit_ethnicity, request),
  }
}

function readCheck<P extends keyof PersonProtectedCharacteristicsPermissions>(
  permission: P,
  request: PermissionsCheckRequest,
): Pick<PersonProtectedCharacteristicsPermissions, P> {
  return { [permission]: baseCheck(permission, request) } as Pick<PersonProtectedCharacteristicsPermissions, P>
}

function editCheck<P extends keyof PersonProtectedCharacteristicsPermissions>(
  permission: P,
  request: PermissionsCheckRequest,
): Pick<PersonProtectedCharacteristicsPermissions, P> {
  return { [permission]: prisonerProfileEditCheck(permission, request) } as Pick<
    PersonProtectedCharacteristicsPermissions,
    P
  >
}
