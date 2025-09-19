export default interface Prisoner {
  prisonerNumber: string
  prisonId?: string
  restrictedPatient: boolean
  supportingPrisonId?: string
  lastPrisonId?: string
  dateOutOfLastPrison?: string
}
