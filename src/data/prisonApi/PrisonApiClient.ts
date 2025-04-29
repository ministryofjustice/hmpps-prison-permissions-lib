import { RestClient, ApiConfig, asUser } from '@ministryofjustice/hmpps-rest-client'
import type Logger from 'bunyan'

export default class PrisonApiClient extends RestClient {
  constructor(logger: Logger | Console, config: ApiConfig) {
    super('Prison API', config, logger)
  }

  isUserAKeyWorker(userToken: string, staffId: number, agencyId: string): Promise<boolean> {
    return this.get<boolean>({ path: `/api/staff/${staffId}/${agencyId}/roles/KW` }, asUser(userToken))
  }
}
