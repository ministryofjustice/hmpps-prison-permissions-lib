import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import socReadCheck from './socRead/SOCReadCheck'
import {
  SOCPermission,
  SOCPermissions,
} from '../../../../../../types/public/permissions/domains/security/soc/SOCPermissions'
import socEditCheck from './socEdit/SOCEditCheck'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function socCheck(context: PrisonerPermissionsContext): SOCPermissions {
  const check = checkWith(context)
  return {
    ...check(SOCPermission.read, socReadCheck),
    ...check(SOCPermission.edit, socEditCheck),
  }
}
