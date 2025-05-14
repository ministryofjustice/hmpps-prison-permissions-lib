export enum PrisonerMoneyPermission {
  read = 'prisoner:prisoner-money:read',
}

export type PrisonerMoneyPermissions = Record<PrisonerMoneyPermission, boolean>
