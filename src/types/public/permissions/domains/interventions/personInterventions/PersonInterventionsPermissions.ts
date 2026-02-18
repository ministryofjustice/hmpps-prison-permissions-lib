export enum PersonInterventionsPermission {
  read_csip = 'prisoner:csip:read',
  edit_csip = 'prisoner:csip:edit',
}

export type PersonInterventionsPermissions = Record<PersonInterventionsPermission, boolean>
