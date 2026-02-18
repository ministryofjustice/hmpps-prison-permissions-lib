export enum PrisonerIncentivesPermission {
  read_incentive_level = 'prisoner:incentives:incentive-level:read',
  read_incentive_level_history = 'prisoner:incentives:incentive-level-history:read',
}

export type PrisonerIncentivesPermissions = Record<PrisonerIncentivesPermission, boolean>
