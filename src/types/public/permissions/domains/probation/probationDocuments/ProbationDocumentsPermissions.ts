export enum ProbationDocumentsPermission {
  read = 'prisoner:probation-documents:read',
}

export type ProbationDocumentsPermissions = Record<ProbationDocumentsPermission, boolean>
