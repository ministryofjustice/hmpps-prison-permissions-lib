import { RestClient, ApiConfig, asUser } from '@ministryofjustice/hmpps-rest-client'
import type Logger from 'bunyan'

export default class PrisonApiClient extends RestClient {
  constructor(logger: Logger | Console, config: ApiConfig) {
    super('Prison API', config, logger)
  }

  isUserAKeyWorker(token: string, staffId: number, agencyId: string) {
    return this.get<boolean>({ path: `/api/staff/${staffId}/${agencyId}/roles/KW` }, asUser(token))
  }
}
