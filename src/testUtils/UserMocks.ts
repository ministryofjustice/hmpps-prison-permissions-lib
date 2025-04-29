import { PrisonUser } from '../types/user/HmppsUser'
import CaseLoad from '../types/user/CaseLoad'

// eslint-disable-next-line import/prefer-default-export
export const prisonUserMock: PrisonUser = {
  authSource: 'nomis',
  username: 'PRISON_USER_MOCK',
  userId: '1A',
  staffId: 1111,
  name: 'JOHN SMITH',
  displayName: 'John Smith',
  caseLoads: [{ caseLoadId: 'MDI', currentlyActive: true } as CaseLoad],
  activeCaseLoadId: 'MDI',
  userRoles: [],
  keyWorkerAtPrisons: {},
}
