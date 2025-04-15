import PrisonApiClient from '../data/prisonApi/PrisonApiClient'
import { HmppsUser } from '../types/user/HmppsUser'

export default class UserService {
  constructor(private readonly prisonApiClient: PrisonApiClient) {}

  async isUserAKeyWorker(token: string, user: HmppsUser): Promise<boolean> {
    if (user.authSource !== 'nomis' || !user.activeCaseLoadId) {
      return Promise.resolve(false)
    }
    const roles = await this.prisonApiClient.isUserAKeyWorker(token, user.staffId, user.activeCaseLoadId)
    return roles ?? []
  }
}
