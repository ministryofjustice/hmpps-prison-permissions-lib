import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import socReadCheck from './socRead/SOCReadCheck'
import { SOCPermission, SOCPermissions } from '../../../../../../types/permissions/domains/security/soc/SOCPermissions'
import socEditCheck from './socEdit/SOCEditCheck'

export default function socCheck(request: PermissionsCheckRequest): SOCPermissions {
  return {
    [SOCPermission.read]: socReadCheck(request),
    [SOCPermission.edit]: socEditCheck(request),
  }
}
