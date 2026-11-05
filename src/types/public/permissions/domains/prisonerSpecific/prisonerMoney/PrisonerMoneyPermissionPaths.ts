import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { PrisonerMoneyPermission } from './PrisonerMoneyPermissions'
import { Path } from '../../../../../internal/utils/Path'

export const prisonerMoneyPermissionPaths: Record<PrisonerMoneyPermission, Path<PrisonerPermissions>> = {
  [PrisonerMoneyPermission.read]: `domainGroups.prisonerSpecific.prisonerMoney.${PrisonerMoneyPermission.read}`,
}
