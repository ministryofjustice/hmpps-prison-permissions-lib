// eslint-disable-next-line import/prefer-default-export
export enum PermissionCheckStatus {
  NOT_PERMITTED = 'NOT_PERMITTED', // Generic not permitted status - default
  NOT_IN_CASELOAD = 'NOT_IN_CASELOAD',
  RESTRICTED_PATIENT = 'RESTRICTED_PATIENT',
  PRISONER_IS_RELEASED = 'PRISONER_IS_RELEASED',
  PRISONER_IS_TRANSFERRING = 'PRISONER_IS_TRANSFERRING',
  OK = 'OK',
}
