export enum PrisonerIncentivesPermission {
  read = 'prisoner:prisoner-incentives:read',
}

export interface PrisonerIncentivesPermissions {
  [PrisonerIncentivesPermission.read]: boolean
}
