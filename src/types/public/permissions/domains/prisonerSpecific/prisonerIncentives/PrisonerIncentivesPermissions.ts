export enum PrisonerIncentivesPermission {
  read = 'prisoner:prisoner-incentives:read',
}

export type PrisonerIncentivesPermissions = Record<PrisonerIncentivesPermission, boolean>
