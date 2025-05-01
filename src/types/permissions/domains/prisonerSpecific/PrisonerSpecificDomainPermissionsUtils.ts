import { PrisonerMoneyPermission } from './PrisonerMoneyPermissions'
import { checkPrisonerMoneyAccess, isPrisonerMoneyPermission } from './PrisonerMoneyPermissionsUtils'
import {
  PrisonerSpecificDomainPermission,
  PrisonerSpecificDomainPermissions,
} from './PrisonerSpecificDomainPermissions'

export function isPrisonerSpecificDomainPermission(permission: string, permissions: PrisonerSpecificDomainPermissions) {
  return isPrisonerMoneyPermission(permission, permissions?.prisonerMoney)
}

export function checkPrisonerSpecificDomainAccess(
  permission: PrisonerSpecificDomainPermission,
  permissions: PrisonerSpecificDomainPermissions,
): boolean {
  if (isPrisonerMoneyPermission(permission, permissions.prisonerMoney)) {
    return checkPrisonerMoneyAccess(permission as PrisonerMoneyPermission, permissions?.prisonerMoney)
  }

  return false
}
