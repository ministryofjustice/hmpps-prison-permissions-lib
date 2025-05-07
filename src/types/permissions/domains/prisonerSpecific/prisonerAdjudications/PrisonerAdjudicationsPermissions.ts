export enum PrisonerAdjudicationsPermission {
  read = 'prisoner:prisoner-adjudications:read',
}

export type PrisonerAdjudicationsPermissions = Record<PrisonerAdjudicationsPermission, boolean>
