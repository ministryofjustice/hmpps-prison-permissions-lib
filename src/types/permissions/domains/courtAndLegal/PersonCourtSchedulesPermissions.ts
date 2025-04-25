export enum PersonCourtSchedulesPermission {
  read_schedule = 'prisoner:person-court-schedule:schedule:read',
}

export interface PersonCourtSchedulesPermissions {
  // Not a full list, for demonstration purposes at the moment:
  [PersonCourtSchedulesPermission.read_schedule]: boolean
}

export function isPersonCourtSchedulesPermission(permission: string, permissions: PersonCourtSchedulesPermissions) {
  return permission in permissions
}

export function checkPersonCourtSchedulesAccess(
  permission: PersonCourtSchedulesPermission,
  permissions: PersonCourtSchedulesPermissions,
): boolean {
  return permissions[permission]
}

export function setPersonCourtSchedulesPermission(permission: PersonCourtSchedulesPermission, permitted: boolean) {
  return {
    domainGroups: {
      courtAndLegal: {
        personCourtSchedules: {
          [permission]: permitted,
        },
      },
    },
  }
}
