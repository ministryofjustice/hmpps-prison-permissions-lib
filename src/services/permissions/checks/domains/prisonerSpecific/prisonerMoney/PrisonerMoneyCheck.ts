import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import {
  PrisonerMoneyPermission,
  PrisonerMoneyPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissions'
import prisonerMoneyReadCheck from './prisonerMoneyRead/PrisonerMoneyReadCheck'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function prisonerMoneyCheck(context: PrisonerPermissionsContext): PrisonerMoneyPermissions {
  const check = checkWith(context)
  return {
    ...check(PrisonerMoneyPermission.read, prisonerMoneyReadCheck),
  }
}
