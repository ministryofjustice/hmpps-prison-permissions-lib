import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import personPrisonCategoryEditCheck from './personPrisonCategoryEdit/PersonPrisonCategoryEditCheck'
import {
  PersonPrisonCategoryPermission,
  PersonPrisonCategoryPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/personPrisonCategory/PersonPrisonCategoryPermissions'
import baseCheck from '../../../baseCheck/BaseCheck'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function personPrisonCategoryCheck(
  context: PrisonerPermissionsContext,
): PersonPrisonCategoryPermissions {
  const check = checkWith(context)
  return {
    ...check(PersonPrisonCategoryPermission.read, baseCheck),
    ...check(PersonPrisonCategoryPermission.edit, personPrisonCategoryEditCheck),
  }
}
