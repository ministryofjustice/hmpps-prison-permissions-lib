import {
  ProbationDocumentsPermission,
  ProbationDocumentsPermissions,
} from './probationDocuments/ProbationDocumentsPermissions'

export interface ProbationDomainPermissions {
  probationDocuments: ProbationDocumentsPermissions
}

export type ProbationDomainPermission = ProbationDocumentsPermission
