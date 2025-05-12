import { PrisonerPermission, PrisonerPermissions } from '../types/permissions/prisoner/PrisonerPermissions'
import { prisonerPermissionPaths } from '../types/permissions/prisoner/PrisonerPermissionPaths'

export const prisonerPermissionsMock: PrisonerPermissions = {
  'prisoner:base-record:read': false,

  domainGroups: {
    person: {
      caseNotes: {
        'prisoner:case-notes:read': false,
        'prisoner:case-notes:edit': false,
        'prisoner:case-notes:sensitive:read': false,
        'prisoner:case-notes:sensitive:delete': false,
        'prisoner:case-notes:sensitive:edit': false,
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
        'prisoner:prisoner-incentives:read': false,
      },
      personPrisonCategory: {
        'prisoner:person-prison-category:edit': false,
      },
      prisonerSchedule: {
        'prisoner:appointment:edit': false,
        'prisoner:activity:edit': false,
      },
      useOfForce: {
        'prisoner:use-of-force:edit': false,
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

export function setPrisonerPermission(
  permission: PrisonerPermission,
  permitted: boolean,
  permissions: PrisonerPermissions = prisonerPermissionsMock,
): PrisonerPermissions {
  const result = structuredClone(permissions)
  const keys = prisonerPermissionPaths[permission].split('.')
  const lastKey = keys.pop() as string
  // @ts-expect-error TS cannot determine object type
  // eslint-disable-next-line no-return-assign,no-param-reassign
  const lastObj = keys.reduce((obj: object, key: string) => (obj[key] = obj[key] || {}), result)

  // @ts-expect-error TS cannot determine object type
  lastObj[lastKey] = permitted
  return result
}
