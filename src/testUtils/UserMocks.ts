import { PrisonUser } from '../types/internal/user/HmppsUser'
import CaseLoad from '../types/internal/user/CaseLoad'

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
