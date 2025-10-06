export default interface Prisoner {
  prisonerNumber: string
  prisonId?: string
  restrictedPatient: boolean
  supportingPrisonId?: string
  previousPrisonId?: string
  previousPrisonLeavingDate?: string
}
