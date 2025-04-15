// eslint-disable-next-line import/prefer-default-export
export enum PermissionCheckStatus {
  NOT_FOUND, // Generic 404 not found - default
  NOT_IN_CASELOAD,
  RESTRICTED_PATIENT,
  PRISONER_IS_RELEASED,
  PRISONER_IS_TRANSFERRING,
  GLOBAL_USER_NOT_PERMITTED,
  OK,
}
