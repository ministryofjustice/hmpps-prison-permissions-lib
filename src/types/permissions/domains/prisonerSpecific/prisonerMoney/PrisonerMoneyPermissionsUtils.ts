import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { PrisonerMoneyPermission, PrisonerMoneyPermissions } from './PrisonerMoneyPermissions'

export function isPrisonerMoneyPermission(permission: string, permissions: PrisonerMoneyPermissions) {
  return permission in (permissions || {})
}

export function checkPrisonerMoneyAccess(
  permission: PrisonerMoneyPermission,
  permissions: PrisonerMoneyPermissions,
): boolean {
  return permissions[permission]
}

export function setPrisonerMoneyPermission(
  permission: PrisonerMoneyPermission,
  permitted: boolean,
  permissions: PrisonerPermissions = {} as PrisonerPermissions,
): PrisonerPermissions {
  return {
    ...permissions,
    domainGroups: {
      ...permissions.domainGroups,
      prisonerSpecific: {
        ...permissions.domainGroups?.prisonerSpecific,
        prisonerMoney: {
          ...permissions.domainGroups?.prisonerSpecific?.prisonerMoney,
          [permission]: permitted,
        },
      },
    },
  }
}
