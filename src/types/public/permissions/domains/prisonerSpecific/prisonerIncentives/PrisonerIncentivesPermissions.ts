export enum PrisonerIncentivesPermission {
  read_incentive_level = 'prisoner:prisoner-incentives:read_incentive_level',
  read_incentive_level_history = 'prisoner:prisoner-incentives:read_incentive_level_history',
}

export type PrisonerIncentivesPermissions = Record<PrisonerIncentivesPermission, boolean>
