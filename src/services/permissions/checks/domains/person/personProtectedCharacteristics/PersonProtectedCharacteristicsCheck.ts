import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import baseCheck from '../../../baseCheck/BaseCheck'
import prisonerProfileEditCheck from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheck'
import {
  PersonProtectedCharacteristicsPermission,
  PersonProtectedCharacteristicsPermissions,
} from '../../../../../../types/public/permissions/domains/person/personProtectedCharacteristics/PersonProtectedCharacteristicsPermissions'
import prisonerProfileSensitiveEditCheck from '../../../sharedChecks/prisonerProfileSensitiveEditCheck/PrisonerProfileSensitiveEditCheck'
import inUsersCaseLoad from '../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoad'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function personProtectedCharacteristicsCheck(
  context: PrisonerPermissionsContext,
): PersonProtectedCharacteristicsPermissions {
  const check = checkWith(context)
  return {
    ...check(PersonProtectedCharacteristicsPermission.read_sexual_orientation, baseCheck),
    ...check(PersonProtectedCharacteristicsPermission.edit_sexual_orientation, prisonerProfileSensitiveEditCheck),

    ...check(PersonProtectedCharacteristicsPermission.read_religion_and_belief, inUsersCaseLoad),
    ...check(PersonProtectedCharacteristicsPermission.edit_religion_and_belief, prisonerProfileEditCheck),

    ...check(PersonProtectedCharacteristicsPermission.read_ethnicity, baseCheck),
    ...check(PersonProtectedCharacteristicsPermission.edit_ethnicity, prisonerProfileSensitiveEditCheck),
  }
}
