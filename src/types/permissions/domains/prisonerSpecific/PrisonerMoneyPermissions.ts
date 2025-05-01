export enum PrisonerMoneyPermission {
  read = 'prisoner:prisoner-money:read',
}

export interface PrisonerMoneyPermissions {
  [PrisonerMoneyPermission.read]: boolean
}
