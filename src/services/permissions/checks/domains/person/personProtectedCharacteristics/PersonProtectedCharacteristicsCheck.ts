import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import baseCheck from '../../../baseCheck/BaseCheck'
import prisonerProfileEditCheck from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheck'
import {
  PersonProtectedCharacteristicsPermission,
  PersonProtectedCharacteristicsPermissions,
} from '../../../../../../types/public/permissions/domains/person/personProtectedCharacteristics/PersonProtectedCharacteristicsPermissions'
import prisonerProfileSensitiveEditCheck from '../../../sharedChecks/prisonerProfileSensitiveEditCheck/PrisonerProfileSensitiveEditCheck'
import inUsersCaseLoad from '../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoad'

export default function personProtectedCharacteristicsCheck(
  request: PermissionsCheckRequest,
): PersonProtectedCharacteristicsPermissions {
  return {
    ...readCheck(PersonProtectedCharacteristicsPermission.read_sexual_orientation, request),
    ...sensitiveEditCheck(PersonProtectedCharacteristicsPermission.edit_sexual_orientation, request),

    [PersonProtectedCharacteristicsPermission.read_religion_and_belief]: inUsersCaseLoad(
      PersonProtectedCharacteristicsPermission.read_religion_and_belief,
      request,
    ),
    ...editCheck(PersonProtectedCharacteristicsPermission.edit_religion_and_belief, request),

    ...readCheck(PersonProtectedCharacteristicsPermission.read_ethnicity, request),
    ...sensitiveEditCheck(PersonProtectedCharacteristicsPermission.edit_ethnicity, request),
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

function sensitiveEditCheck<P extends keyof PersonProtectedCharacteristicsPermissions>(
  permission: P,
  request: PermissionsCheckRequest,
): Pick<PersonProtectedCharacteristicsPermissions, P> {
  return { [permission]: prisonerProfileSensitiveEditCheck(permission, request) } as Pick<
    PersonProtectedCharacteristicsPermissions,
    P
  >
}
