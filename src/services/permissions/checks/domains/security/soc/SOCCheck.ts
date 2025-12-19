import PermissionsCheckContext from '../../../PermissionsCheckContext'
import socReadCheck from './socRead/SOCReadCheck'
import {
  SOCPermission,
  SOCPermissions,
} from '../../../../../../types/public/permissions/domains/security/soc/SOCPermissions'
import socEditCheck from './socEdit/SOCEditCheck'

export default function socCheck(request: PermissionsCheckContext): SOCPermissions {
  return {
    [SOCPermission.read]: socReadCheck(request),
    [SOCPermission.edit]: socEditCheck(request),
  }
}
