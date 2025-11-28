import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PersonPrisonCategoryPermission } from './PersonPrisonCategoryPermissions'

// eslint-disable-next-line import/prefer-default-export
export const personPrisonCategoryPermissionPaths: Record<PersonPrisonCategoryPermission, Path<PrisonerPermissions>> = {
  [PersonPrisonCategoryPermission.read]: `domainGroups.prisonerSpecific.personPrisonCategory.${PersonPrisonCategoryPermission.read}`,
  [PersonPrisonCategoryPermission.edit]: `domainGroups.prisonerSpecific.personPrisonCategory.${PersonPrisonCategoryPermission.edit}`,
}
