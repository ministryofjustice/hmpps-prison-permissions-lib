import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PersonPrisonCategoryPermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/personPrisonCategory/PersonPrisonCategoryPermissions'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

const permission = PersonPrisonCategoryPermission.edit

const personPrisonCategoryEditCheck = (request: PermissionsCheckContext) =>
  matchBaseCheckAnd(request, permission, {
    atLeastOneRoleRequiredFrom: [
      Role.CreateCategorisation,
      Role.CreateRecategorisation,
      Role.ApproveCategorisation,
      Role.CategorisationSecurity,
    ],
  })

export default personPrisonCategoryEditCheck
