import PermissionsCheckContext from '../../../PermissionsCheckContext'
import personPrisonCategoryEditCheck from './personPrisonCategoryEdit/PersonPrisonCategoryEditCheck'
import {
  PersonPrisonCategoryPermission,
  PersonPrisonCategoryPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/personPrisonCategory/PersonPrisonCategoryPermissions'
import baseCheck from '../../../baseCheck/BaseCheck'

export default function personPrisonCategoryCheck(context: PermissionsCheckContext): PersonPrisonCategoryPermissions {
  return {
    [PersonPrisonCategoryPermission.read]: baseCheck(PersonPrisonCategoryPermission.read, context),
    [PersonPrisonCategoryPermission.edit]: personPrisonCategoryEditCheck(context),
  }
}
