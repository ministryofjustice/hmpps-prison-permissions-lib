import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { ProbationDomainPermissions } from '../../../../../types/public/permissions/domains/probation/ProbationDomainPermissions'
import probationDocumentsCheck from './probationDocuments/ProbationDocumentsCheck'

export default function probationCheck(context: PrisonerPermissionsContext): ProbationDomainPermissions {
  return {
    probationDocuments: probationDocumentsCheck(context),
  }
}
