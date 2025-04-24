import Prisoner from '../main/data/hmppsPrisonerSearch/interfaces/Prisoner'

export const prisonerMock: Prisoner = {
  prisonerNumber: 'A1234AA',
  prisonId: 'MDI',
  restrictedPatient: false,
}

export const prisonerMDI = { ...prisonerMock, prisonerNumber: 'PRISONER_MDI' }
export const prisonerLEI = { ...prisonerMock, prisonerNumber: 'PRISONER_LEI', prisonId: 'LEI' }
export const prisonerOUT = { ...prisonerMock, prisonerNumber: 'PRISONER_OUT', prisonId: 'OUT' }
export const prisonerTRN = { ...prisonerMock, prisonerNumber: 'PRISONER_TRN', prisonId: 'TRN' }
export const restrictedPrisonerMDI = {
  ...prisonerMock,
  prisonerNumber: 'RESTRICTED_PATIENT_MDI',
  prisonId: 'OUT',
  restrictedPatient: true,
  supportingPrisonId: 'MDI',
}
export const restrictedPrisonerLEI = {
  ...prisonerMock,
  prisonerNumber: 'RESTRICTED_PATIENT_LEI',
  prisonId: 'OUT',
  restrictedPatient: true,
  supportingPrisonId: 'LEI',
}
export const restrictedPrisonerWithPrisonIdMDI = {
  ...prisonerMock,
  prisonerNumber: 'RESTRICTED_PATIENT_MDI',
  prisonId: 'MDI', // This would be unusual, if they are a restricted patient, they should be 'OUT'
  restrictedPatient: true,
}
