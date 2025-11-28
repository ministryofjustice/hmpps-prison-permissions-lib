import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import personPrisonCategoryEditCheck from './personPrisonCategoryEdit/PersonPrisonCategoryEditCheck'
import {
  PersonPrisonCategoryPermission,
  PersonPrisonCategoryPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/personPrisonCategory/PersonPrisonCategoryPermissions'
import baseCheck from '../../../baseCheck/BaseCheck'

export default function personPrisonCategoryCheck(request: PermissionsCheckRequest): PersonPrisonCategoryPermissions {
  return {
    [PersonPrisonCategoryPermission.read]: baseCheck(PersonPrisonCategoryPermission.read, request),
    [PersonPrisonCategoryPermission.edit]: personPrisonCategoryEditCheck(request),
  }
}
