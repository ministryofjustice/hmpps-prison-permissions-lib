import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../utils/Path'
import { PersonPrisonCategoryPermission } from './PersonPrisonCategoryPermissions'

// eslint-disable-next-line import/prefer-default-export
export const personPrisonCategoryPermissionPaths: Record<PersonPrisonCategoryPermission, Path<PrisonerPermissions>> = {
  [PersonPrisonCategoryPermission.edit]: `domainGroups.prisonerSpecific.personPrisonCategory.${PersonPrisonCategoryPermission.edit}`,
}
