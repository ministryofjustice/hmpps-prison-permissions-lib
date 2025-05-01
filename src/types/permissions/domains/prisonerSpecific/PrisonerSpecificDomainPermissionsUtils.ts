import { PrisonerMoneyPermission } from './prisonerMoney/PrisonerMoneyPermissions'
import { checkPrisonerMoneyAccess, isPrisonerMoneyPermission } from './prisonerMoney/PrisonerMoneyPermissionsUtils'
import {
  PrisonerSpecificDomainPermission,
  PrisonerSpecificDomainPermissions,
} from './PrisonerSpecificDomainPermissions'
import {
  checkPrisonerAdjudicationsAccess,
  isPrisonerAdjudicationsPermission,
} from './prisonerAdjudications/PrisonerAdjudicationsPermissionsUtils'
import { PrisonerAdjudicationsPermission } from './prisonerAdjudications/PrisonerAdjudicationsPermissions'

export function isPrisonerSpecificDomainPermission(permission: string, permissions: PrisonerSpecificDomainPermissions) {
  return (
    isPrisonerMoneyPermission(permission, permissions?.prisonerMoney) ||
    isPrisonerAdjudicationsPermission(permission, permissions?.prisonerAdjudications)
  )
}

export function checkPrisonerSpecificDomainAccess(
  permission: PrisonerSpecificDomainPermission,
  permissions: PrisonerSpecificDomainPermissions,
): boolean {
  if (isPrisonerMoneyPermission(permission, permissions.prisonerMoney)) {
    return checkPrisonerMoneyAccess(permission as PrisonerMoneyPermission, permissions?.prisonerMoney)
  }

  if (isPrisonerAdjudicationsPermission(permission, permissions.prisonerAdjudications)) {
    return checkPrisonerAdjudicationsAccess(
      permission as PrisonerAdjudicationsPermission,
      permissions?.prisonerAdjudications,
    )
  }

  return false
}
