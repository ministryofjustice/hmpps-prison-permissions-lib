import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import baseCheck from '../../../baseCheck/BaseCheck'
import prisonerProfileEditCheck from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheck'
import {
  PersonHealthAndMedicationPermission,
  PersonHealthAndMedicationPermissions,
} from '../../../../../../types/public/permissions/domains/person/personHealthAndMedication/PersonHealthAndMedicationPermissions'
import dietEditCheck from './dietEdit/DietEditCheck'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function personHealthAndMedicationCheck(
  context: PrisonerPermissionsContext,
): PersonHealthAndMedicationPermissions {
  const check = checkWith(context)
  return {
    ...check(PersonHealthAndMedicationPermission.read_pregnancy, baseCheck),
    ...check(PersonHealthAndMedicationPermission.edit_pregnancy, prisonerProfileEditCheck),

    ...check(PersonHealthAndMedicationPermission.read_smoker, baseCheck),
    ...check(PersonHealthAndMedicationPermission.edit_smoker, prisonerProfileEditCheck),

    ...check(PersonHealthAndMedicationPermission.read_diet, baseCheck),
    ...check(PersonHealthAndMedicationPermission.edit_diet, dietEditCheck),
  }
}
