import { PrisonerPermissions } from '../types/permissions/prisoner/PrisonerPermissions'

// eslint-disable-next-line import/prefer-default-export
export const prisonerPermissionsMock: PrisonerPermissions = {
  'prisoner:base-record:read': false,

  domainGroups: {
    sentenceAndOffence: {
      personSentenceCalculation: {
        'prisoner:person-sentence-calculation:read': false,
        'prisoner:person-sentence-calculation:adjustments:edit': false,
      },
    },
    prisonerSpecific: {
      prisonerMoney: {
        'prisoner:prisoner-money:read': false,
      },
    },
  },
}
