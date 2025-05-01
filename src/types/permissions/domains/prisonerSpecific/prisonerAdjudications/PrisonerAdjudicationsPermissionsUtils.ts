import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { PrisonerAdjudicationsPermission, PrisonerAdjudicationsPermissions } from './PrisonerAdjudicationsPermissions'

export function isPrisonerAdjudicationsPermission(permission: string, permissions: PrisonerAdjudicationsPermissions) {
  return permission in (permissions || {})
}

export function checkPrisonerAdjudicationsAccess(
  permission: PrisonerAdjudicationsPermission,
  permissions: PrisonerAdjudicationsPermissions,
): boolean {
  return permissions[permission]
}

export function setPrisonerAdjudicationsPermission(
  permission: PrisonerAdjudicationsPermission,
  permitted: boolean,
  permissions: PrisonerPermissions = {} as PrisonerPermissions,
): PrisonerPermissions {
  return {
    ...permissions,
    domainGroups: {
      ...permissions.domainGroups,
      prisonerSpecific: {
        ...permissions.domainGroups?.prisonerSpecific,
        prisonerAdjudications: {
          ...permissions.domainGroups?.prisonerSpecific?.prisonerAdjudications,
          [permission]: permitted,
        },
      },
    },
  }
}
