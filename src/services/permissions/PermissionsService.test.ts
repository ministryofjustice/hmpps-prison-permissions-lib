import PermissionsService from './PermissionsService'
import PrisonApiClient from '../../data/prisonApi/PrisonApiClient'
import PrisonerSearchClient from '../../data/hmppsPrisonerSearch/PrisonerSearchClient'
import PermissionsLogger from './PermissionsLogger'
import { HmppsUser, PrisonUser } from '../../types/user/HmppsUser'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PrisonerBasePermission } from '../../types/permissions/prisoner/PrisonerPermissions'
import { scenarioTest } from '../../testUtils/TestScenario'
import { baseCheckScenarios } from './checks/baseCheck/BaseCheckTestScenarios'
import { PersonSentenceCalculationPermission } from '../../types/permissions/domains/sentenceAndOffence/PersonSentenceCalculationPermissions'
import { sentenceCalculationReadScenarios } from './checks/domains/sentenceAndOffence/personSentenceCalculation/sentenceCalculationRead/SentenceCalculationReadTestScenarios'
import { sentenceCalculationEditAdjustmentScenarios } from './checks/domains/sentenceAndOffence/personSentenceCalculation/sentenceCalculationAdjustmentEdit/SentenceCalculationEditAdjustmentTestScenarios'

describe('PermissionsService', () => {
  let prisonApiClient: PrisonApiClient
  let prisonerSearchClient: PrisonerSearchClient
  let permissionsLogger: PermissionsLogger

  let service: PermissionsService

  beforeEach(() => {
    prisonApiClient = { isUserAKeyWorker: jest.fn() } as unknown as PrisonApiClient
    prisonerSearchClient = { getPrisonerDetails: jest.fn() } as unknown as PrisonerSearchClient
    permissionsLogger = { logPermissionCheckStatus: jest.fn() } as unknown as PermissionsLogger

    // @ts-expect-error - We are using a private constructor here for testing
    service = new (PermissionsService as unknown)(prisonApiClient, prisonerSearchClient, permissionsLogger)
  })

  describe('getPrisonerPermissions', () => {
    describe('Base check', () => {
      scenarioTest(baseCheckScenarios, PrisonerBasePermission.read)
    })

    describe('Domains', () => {
      describe('Sentence / Offence', () => {
        describe('Person Sentence Calculation', () => {
          scenarioTest(sentenceCalculationReadScenarios, PersonSentenceCalculationPermission.read)
          scenarioTest(sentenceCalculationEditAdjustmentScenarios, PersonSentenceCalculationPermission.edit_adjustments)
        })
      })
    })
  })

  describe('isUserAKeyWorkerAtPrison', () => {
    it.each([true, false])(`returns result: '%s' from Prison API`, async response => {
      const prisonUser = { authSource: 'nomis', staffId: 123 } as PrisonUser

      prisonApiClient.isUserAKeyWorker = jest.fn(() => Promise.resolve(response))

      expect(await service.isUserAKeyWorkerAtPrison('token', prisonUser, 'MDI')).toEqual(response)
    })

    it.each(['delius', 'external', 'azuread'])('returns false for a non-prison user of type: %s', async userType => {
      const user = { authSource: userType, staffId: 123 } as HmppsUser

      expect(await service.isUserAKeyWorkerAtPrison('token', user, 'MDI')).toBeFalsy()
    })
  })

  describe('getPrisonerDetails', () => {
    it('returns result from Prisoner Search client', async () => {
      const prisonerData = { prisonerNumber: 'A1234BC' } as Prisoner

      prisonerSearchClient.getPrisonerDetails = jest.fn(() => Promise.resolve(prisonerData))

      expect(await service.getPrisonerDetails('A1234BC')).toEqual(prisonerData)
    })
  })
})
