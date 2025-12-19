import PermissionsCheckContext from '../../../PermissionsCheckContext'
import baseCheck from '../../../baseCheck/BaseCheck'
import prisonerProfileEditCheck from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheck'
import {
  PersonHealthAndMedicationPermission,
  PersonHealthAndMedicationPermissions,
} from '../../../../../../types/public/permissions/domains/person/personHealthAndMedication/PersonHealthAndMedicationPermissions'
import dietEditCheck from './dietEdit/DietEditCheck'

export default function personHealthAndMedicationCheck(
  request: PermissionsCheckContext,
): PersonHealthAndMedicationPermissions {
  return {
    ...readCheck(PersonHealthAndMedicationPermission.read_pregnancy, request),
    ...editCheck(PersonHealthAndMedicationPermission.edit_pregnancy, request),

    ...readCheck(PersonHealthAndMedicationPermission.read_smoker, request),
    ...editCheck(PersonHealthAndMedicationPermission.edit_smoker, request),

    ...readCheck(PersonHealthAndMedicationPermission.read_diet, request),
    [PersonHealthAndMedicationPermission.edit_diet]: dietEditCheck(request),
  }
}

function readCheck<P extends keyof PersonHealthAndMedicationPermissions>(
  permission: P,
  request: PermissionsCheckContext,
): Pick<PersonHealthAndMedicationPermissions, P> {
  return { [permission]: baseCheck(permission, request) } as Pick<PersonHealthAndMedicationPermissions, P>
}

function editCheck<P extends keyof PersonHealthAndMedicationPermissions>(
  permission: P,
  request: PermissionsCheckContext,
): Pick<PersonHealthAndMedicationPermissions, P> {
  return { [permission]: prisonerProfileEditCheck(permission, request) } as Pick<
    PersonHealthAndMedicationPermissions,
    P
  >
}
