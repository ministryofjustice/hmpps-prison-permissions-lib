export enum PrisonerAdjudicationsPermission {
  read = 'prisoner:prisoner-adjudications:read',
}

export interface PrisonerAdjudicationsPermissions {
  [PrisonerAdjudicationsPermission.read]: boolean
}
