export enum PrisonerSpecificRisksPermission {
  read_csra_rating = 'prisoner:csra-rating:read',
  read_csra_assessment_history = 'prisoner:csra-assessment-history:read',
}

export type PrisonerSpecificRisksPermissions = Record<PrisonerSpecificRisksPermission, boolean>
