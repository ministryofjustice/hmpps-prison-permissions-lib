import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import personPrisonCategoryEditCheck from './personPrisonCategoryEdit/PersonPrisonCategoryEditCheck'
import {
  PersonPrisonCategoryPermission,
  PersonPrisonCategoryPermissions,
} from '../../../../../../types/permissions/domains/prisonerSpecific/personPrisonCategory/PersonPrisonCategoryPermissions'

export default function personPrisonCategoryCheck(request: PermissionsCheckRequest): PersonPrisonCategoryPermissions {
  return {
    [PersonPrisonCategoryPermission.edit]: personPrisonCategoryEditCheck(request),
  }
}
