import { PrisonerPermissions } from '../types/public/permissions/prisoner/PrisonerPermissions'

// eslint-disable-next-line import/prefer-default-export
export const prisonerPermissionsMock: PrisonerPermissions = {
  'prisoner:base-record:read': false,

  domainGroups: {
    interventions: {
      personInterventions: {
        'prisoner:csip:read': false,
        'prisoner:csip:edit': false,
      },
    },
    person: {
      caseNotes: {
        'prisoner:case-notes:read': false,
        'prisoner:case-notes:edit': false,
        'prisoner:case-notes:sensitive:read': false,
        'prisoner:case-notes:sensitive:delete': false,
        'prisoner:case-notes:sensitive:edit': false,
      },
      corePersonRecord: {
        'prisoner:physical_characteristics:read': false,
        'prisoner:physical_characteristics:edit': false,
        'prisoner:photo:read': false,
        'prisoner:photo:edit': false,
        'prisoner:place-of-birth:read': false,
        'prisoner:place-of-birth:edit': false,
        'prisoner:military-history:read': false,
        'prisoner:military-history:edit': false,
        'prisoner:name-and-aliases:read': false,
        'prisoner:name-and-aliases:edit': false,
        'prisoner:date-of-birth:read': false,
        'prisoner:date-of-birth:edit': false,
        'prisoner:address:read': false,
        'prisoner:address:edit': false,
        'prisoner:nationality:read': false,
        'prisoner:nationality:edit': false,
        'prisoner:identifiers:read': false,
        'prisoner:identifiers:edit': false,
        'prisoner:phone-numbers:read': false,
        'prisoner:phone-numbers:edit': false,
        'prisoner:email-addresses:read': false,
        'prisoner:email-addresses:edit': false,
        'prisoner:distinguishing-marks:read': false,
        'prisoner:distinguishing-marks:edit': false,
      },
      personProtectedCharacteristics: {
        'prisoner:sexual-orientation:read': false,
        'prisoner:sexual-orientation:edit': false,
        'prisoner:religion-and-belief:read': false,
        'prisoner:religion-and-belief:edit': false,
        'prisoner:ethnicity:read': false,
        'prisoner:ethnicity:edit': false,
      },
      personHealthAndMedication: {
        'prisoner:pregnancy:read': false,
        'prisoner:pregnancy:edit': false,
        'prisoner:diet:read': false,
        'prisoner:diet:edit': false,
        'prisoner:smoker:read': false,
        'prisoner:smoker:edit': false,
      },
      personalRelationships: {
        'prisoner:number-of-children:read': false,
        'prisoner:number-of-children:edit': false,
        'prisoner:domestic-status:read': false,
        'prisoner:domestic-status:edit': false,
        'prisoner:emergency-contacts:read': false,
        'prisoner:emergency-contacts:edit': false,
        'prisoner:contacts:read': false,
        'prisoner:contacts:edit': false,
        'prisoner:contact-restrictions:edit': false,
        'prisoner:contact-visit-approval:edit': false,
      },
    },
    personPlanAndNeeds: {
      personCommunicationNeeds: {
        'prisoner:language:read': false,
        'prisoner:language:edit': false,
      },
    },
    prisonerSpecific: {
      prisonerMoney: {
        'prisoner:prisoner-money:read': false,
      },
      prisonerAdjudications: {
        'prisoner:prisoner-adjudications:read': false,
      },
      prisonerIncentives: {
        'prisoner:incentives:incentive-level:read': false,
        'prisoner:incentives:incentive-level-history:read': false,
      },
      personPrisonCategory: {
        'prisoner:person-prison-category:read': false,
        'prisoner:person-prison-category:edit': false,
      },
      prisonerSchedule: {
        'prisoner:schedule:read': false,
        'prisoner:appointment:edit': false,
        'prisoner:activity:edit': false,
      },
      useOfForce: {
        'prisoner:use-of-force:edit': false,
      },
      prisonerAlerts: {
        'prisoner:prisoner-alerts:edit': false,
      },
      prisonerSpecificRisks: {
        'prisoner:csra-rating:read': false,
        'prisoner:csra-assessment-history:read': false,
      },
    },
    probation: {
      probationDocuments: {
        'prisoner:probation-documents:read': false,
      },
    },
    runningAPrison: {
      prisonerVisitsAndVisitors: {
        'prisoner:prisoner-visits-and-visitors:read': false,
      },
      prisonerBaseLocation: {
        'prisoner:location-cell:edit': false,
        'prisoner:location-details:read': false,
        'prisoner:location-history:read': false,
      },
      prisonerMoves: {
        'prisoner:temporary-absence:read': false,
        'prisoner:temporary-absence:edit': false,
      },
    },
    security: {
      pathfinder: {
        'prisoner:pathfinder:read': false,
        'prisoner:pathfinder:edit': false,
      },
      soc: {
        'prisoner:soc:read': false,
        'prisoner:soc:edit': false,
      },
    },
    sentenceAndOffence: {
      personSentenceCalculation: {
        'prisoner:person-sentence-calculation:read': false,
        'prisoner:person-sentence-calculation:adjustments:edit': false,
      },
    },
  },
}
