export enum PersonInterventionsPermission {
  read_csip = 'prisoner:csip:read',
}

export type PersonInterventionsPermissions = Record<PersonInterventionsPermission, boolean>
