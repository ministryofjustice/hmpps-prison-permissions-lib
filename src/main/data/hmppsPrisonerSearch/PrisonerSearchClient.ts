import { RestClient, ApiConfig, AuthenticationClient, asSystem } from '@ministryofjustice/hmpps-rest-client'
import type Logger from 'bunyan'
import Prisoner from './interfaces/Prisoner'

export default class PrisonerSearchClient extends RestClient {
  constructor(logger: Logger | Console, config: ApiConfig, authenticationClient: AuthenticationClient) {
    super('Prisoner Search', config, logger, authenticationClient)
  }

  getPrisonerDetails(prisonerNumber: string): Promise<Prisoner> {
    return this.get<Prisoner>({ path: `/prisoner/${prisonerNumber}` }, asSystem())
  }
}
