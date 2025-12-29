import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import {
  CorePersonRecordPermission,
  CorePersonRecordPermissions,
} from '../../../../../../types/public/permissions/domains/person/corePersonRecord/CorePersonRecordPermissions'
import baseCheck from '../../../baseCheck/BaseCheck'
import prisonerProfileEditCheck from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheck'
import prisonerProfileSensitiveEditCheck from '../../../sharedChecks/prisonerProfileSensitiveEditCheck/PrisonerProfileSensitiveEditCheck'
import photoReadCheck from './photo/PhotoReadCheck'
import { Role } from '../../../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasSomeRolesFrom from '../../../sharedChecks/inActiveCaseLoadAndUserHasSomeRolesFrom/InActiveCaseLoadAndUserHasSomeRolesFrom'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function corePersonRecordCheck(context: PrisonerPermissionsContext): CorePersonRecordPermissions {
  const check = checkWith(context)
  return {
    ...check(CorePersonRecordPermission.read_photo, photoReadCheck),
    ...check(
      CorePersonRecordPermission.edit_photo,
      inActiveCaseLoadAndUserHasSomeRolesFrom([Role.PrisonerProfileSensitiveEdit, Role.PrisonerProfilePhotoUpload]),
    ),

    ...check(CorePersonRecordPermission.read_physical_characteristics, baseCheck),
    ...check(CorePersonRecordPermission.edit_physical_characteristics, prisonerProfileEditCheck),

    ...check(CorePersonRecordPermission.read_place_of_birth, baseCheck),
    ...check(CorePersonRecordPermission.edit_place_of_birth, prisonerProfileSensitiveEditCheck),

    ...check(CorePersonRecordPermission.read_military_history, baseCheck),
    ...check(CorePersonRecordPermission.edit_military_history, prisonerProfileEditCheck),

    ...check(CorePersonRecordPermission.read_name_and_aliases, baseCheck),
    ...check(CorePersonRecordPermission.edit_name_and_aliases, prisonerProfileSensitiveEditCheck),

    ...check(CorePersonRecordPermission.read_date_of_birth, baseCheck),
    ...check(CorePersonRecordPermission.edit_date_of_birth, prisonerProfileSensitiveEditCheck),

    ...check(CorePersonRecordPermission.read_address, baseCheck),
    ...check(CorePersonRecordPermission.edit_address, prisonerProfileSensitiveEditCheck),

    ...check(CorePersonRecordPermission.read_nationality, baseCheck),
    ...check(CorePersonRecordPermission.edit_nationality, prisonerProfileSensitiveEditCheck),

    ...check(CorePersonRecordPermission.read_identifiers, baseCheck),
    ...check(CorePersonRecordPermission.edit_identifiers, prisonerProfileSensitiveEditCheck),

    ...check(CorePersonRecordPermission.read_phone_numbers, baseCheck),
    ...check(CorePersonRecordPermission.edit_phone_numbers, prisonerProfileSensitiveEditCheck),

    ...check(CorePersonRecordPermission.read_email_addresses, baseCheck),
    ...check(CorePersonRecordPermission.edit_email_addresses, prisonerProfileSensitiveEditCheck),

    ...check(CorePersonRecordPermission.read_distinguishing_marks, baseCheck),
    ...check(CorePersonRecordPermission.edit_distinguishing_marks, prisonerProfileSensitiveEditCheck),
  }
}
